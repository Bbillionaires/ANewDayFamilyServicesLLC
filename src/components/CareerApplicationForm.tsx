"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

type Status = "idle" | "submitting" | "sent" | "error" | "not_configured" | "validation_error";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function CareerApplicationForm() {
  const t = useTranslations("CareersPage");
  const positionOptions = t.raw("positionOptions") as string[];

  const [status, setStatus] = useState<Status>("idle");
  const [validationError, setValidationError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const resume = data.get("resume");

    if (!name || !email || !message) {
      setValidationError(t("missingFieldsMessage"));
      setStatus("validation_error");
      return;
    }
    if (!isValidEmail(email)) {
      setValidationError(t("invalidEmailMessage"));
      setStatus("validation_error");
      return;
    }
    if (resume instanceof File && resume.size > 0) {
      if (resume.size > MAX_RESUME_BYTES) {
        setValidationError(t("resumeTooLargeMessage"));
        setStatus("validation_error");
        return;
      }
      if (resume.type && !ALLOWED_RESUME_TYPES.includes(resume.type)) {
        setValidationError(t("resumeInvalidTypeMessage"));
        setStatus("validation_error");
        return;
      }
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/careers", { method: "POST", body: data });
      const result = await res.json();

      if (res.ok && result.status === "sent") {
        setStatus("sent");
        formRef.current?.reset();
      } else if (res.ok && result.status === "not_configured") {
        setStatus("not_configured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-harbor-100 bg-harbor-50 p-8 text-center">
        <p className="font-display text-lg font-semibold text-harbor-900">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-harbor-100 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-harbor-800">
            {t("nameLabel")} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-harbor-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dawn-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-harbor-800">
            {t("emailLabel")} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-harbor-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dawn-400"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-harbor-800">
            {t("phoneLabel")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="mt-1.5 w-full rounded-lg border border-harbor-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dawn-400"
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-harbor-800">
            {t("positionLabel")}
          </label>
          <select
            id="position"
            name="position"
            defaultValue=""
            className="mt-1.5 w-full rounded-lg border border-harbor-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dawn-400"
          >
            <option value="" disabled>
              {t("positionPlaceholder")}
            </option>
            {positionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-harbor-800">
          {t("resumeLabel")}
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="mt-1.5 w-full rounded-lg border border-harbor-200 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-harbor-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-harbor-700"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-harbor-800">
          {t("messageLabel")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-lg border border-harbor-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dawn-400"
        />
      </div>

      {status === "validation_error" && (
        <p className="rounded-lg bg-dawn-50 px-4 py-3 text-sm text-dawn-800">{validationError}</p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-dawn-50 px-4 py-3 text-sm text-dawn-800">{t("errorMessage")}</p>
      )}
      {status === "not_configured" && (
        <p className="rounded-lg bg-harbor-50 px-4 py-3 text-sm text-harbor-700">
          {t("notConfiguredMessage")}{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-dawn-700 hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-harbor-500">{t("requiredNote")}</p>
        <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </div>
      <p className="text-xs text-harbor-400">{t("consentNote")}</p>
    </form>
  );
}
