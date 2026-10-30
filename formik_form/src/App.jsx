import React, { useRef, useState } from "react";
import { Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import "./App.css";

const branches = ["New Delhi", "Noida", "Gurugram"];
const products = ["Gold Loan", "Loan Against Property", "Personal Loan"];
const schemes = ["Standard", "Flexi", "Premium"];
const loanTypes = ["Term Loan", "Overdraft", "Bullet Repayment"];
const purposes = ["Business", "Education", "Personal", "Other"];
const managers = ["Aman Sharma", "Priya Singh", "Rahul Verma"];
const STORAGE_KEY = "demo-new-loan";

const fieldLabels = {
  branch: "Branch",
  product: "Product",
  scheme: "Scheme",
  applicationDate: "Application Dt",
  loanType: "Type of Loan",
  loanTenure: "Loan Tenure",
  loanAmount: "Loan Amt",
};

const summaryFields = [
  ["App Form No", "appFormNo"],
  ["Branch", "branch"],
  ["Product", "product"],
  ["Scheme", "scheme"],
  ["Application Dt", "applicationDate"],
  ["Type of Loan", "loanType"],
  ["Loan Tenure", "loanTenure"],
  ["Relationship Mgr1", "relationshipManager"],
  ["Loan Amt", "loanAmount"],
  ["Purpose/Sub-Scheme", "purpose"],
];

function localDate() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function blankForm() {
  return {
    appFormNo: "",
    branch: "",
    product: "",
    scheme: "",
    applicationDate: localDate(),
    loanType: "",
    loanTenure: "",
    relationshipManager: "",
    loanAmount: "",
    purpose: "",
  };
}

// Only validate fields that actually exist in this simplified form.
const validationSchema = Yup.object({
  branch: Yup.string().required("Please select a branch"),
  product: Yup.string().required("Please select a product"),
  scheme: Yup.string().required("Please select a scheme"),
  applicationDate: Yup.date()
    .typeError("Enter a valid date")
    .required("Application date is required"),
  loanType: Yup.string().required("Please select a loan type"),
  loanTenure: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Enter a valid tenure")
    .integer("Tenure must be a whole number")
    .positive("Tenure must be positive")
    .required("Loan tenure is required"),
  loanAmount: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .typeError("Enter a valid amount")
    .positive("Amount must be greater than zero")
    .required("Loan amount is required"),
});

function useFieldError(name) {
  const { errors, touched, submitCount } = useFormikContext();
  return touched[name] || submitCount > 0 ? errors[name] : undefined;
}

function InputRow({ label, name, type = "text", readOnly = false, placeholder = "" }) {
  const error = useFieldError(name);
  return (
    <div className="field-row">
      <label htmlFor={name}>{label}</label>
      <div className="control-group">
        <Field
          id={name}
          name={name}
          type={type}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${readOnly ? "locked-field" : ""} ${error ? "invalid-field" : ""}`.trim()}
        />
        {error && <div className="error-text" id={`${name}-error`}>{error}</div>}
      </div>
    </div>
  );
}

function SelectRow({ label, name, options }) {
  const error = useFieldError(name);
  return (
    <div className="field-row">
      <label htmlFor={name}>{label}</label>
      <div className="control-group">
        <Field
          as="select"
          id={name}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={error ? "invalid-field" : ""}
        >
          <option value="">--Select--</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Field>
        {error && <div className="error-text" id={`${name}-error`}>{error}</div>}
      </div>
    </div>
  );
}

function formatValue(name, value) {
  if (value === undefined || value === null || value === "") return "Not specified";
  if (name === "loanAmount") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(value));
  }
  if (name === "applicationDate" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
  }
  if (name === "loanTenure") return `${value} months`;
  return String(value);
}

function LoanSummary({ record, onNew, onEdit }) {
  return (
    <main className="dashboard">
      <div className="dashboard-top">
        <div>
          <p className="eyebrow">MY DASHBOARD</p>
          <h1>Saved Loan Application</h1>
        </div>
        <button type="button" className="primary-button" onClick={onNew}>
          + New Loan
        </button>
      </div>

      {record ? (
        <section className="summary-card" aria-label="Saved loan details">
          <div className="summary-header">
            <div>
              <p className="summary-kicker">Application number</p>
              <h2>{record.appFormNo || "Not assigned"}</h2>
              <p className="summary-product">{record.product || "Loan Application"}</p>
            </div>
            <div className="summary-amount">
              <span>Loan Amount</span>
              <strong>{formatValue("loanAmount", record.loanAmount)}</strong>
            </div>
          </div>
          <h3 className="summary-heading">Product Details</h3>
          <dl className="summary-grid">
            {summaryFields.map(([label, name]) => (
              <div className="summary-item" key={name}>
                <dt>{label}</dt>
                <dd>{formatValue(name, record[name])}</dd>
              </div>
            ))}
          </dl>
          <div className="summary-footer">
            <button type="button" className="outline-button" onClick={onEdit}>
              Edit Application
            </button>
          </div>
        </section>
      ) : (
        <div className="empty-state">
          <h2>No saved loan application yet</h2>
          <p>Complete the Product Detail form, then select Save &amp; Exit.</p>
          <button type="button" className="primary-button" onClick={onNew}>
            Create Loan
          </button>
        </div>
      )}
    </main>
  );
}

function App() {
  const [savedRecord, setSavedRecord] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  });
  const [screen, setScreen] = useState("form");
  const [formValues, setFormValues] = useState(blankForm);
  const [formKey, setFormKey] = useState(0);
  const [savedNotice, setSavedNotice] = useState("");
  const [managerDialogOpen, setManagerDialogOpen] = useState(false);
  const actionRef = useRef("save");

  function openForm(values) {
    setFormValues(values ? { ...blankForm(), ...Object.fromEntries(
      Object.keys(blankForm()).map((key) => [key, values[key] ?? blankForm()[key]])
    ) } : blankForm());
    setFormKey((key) => key + 1);
    setSavedNotice("");
    setManagerDialogOpen(false);
    actionRef.current = "save";
    setScreen("form");
  }

  return (
    <div className="page-shell">
      {screen === "dashboard" ? (
        <LoanSummary
          record={savedRecord}
          onNew={() => openForm(null)}
          onEdit={() => openForm(savedRecord)}
        />
      ) : (
        <Formik
          key={formKey}
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const record = {
              ...values,
              appFormNo: values.appFormNo || `LN-${Date.now().toString().slice(-8)}`,
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
              setSavedRecord(record);
              resetForm({ values: record });
              setSavedNotice(`Application ${record.appFormNo} saved successfully.`);
              if (actionRef.current === "exit") setScreen("dashboard");
            } catch {
              setSavedNotice("Could not save the application. Please check your browser storage.");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, submitCount, errors, setFieldValue }) => (
            <Form noValidate>
              <header className="topbar">
                <span className="topbar-title">NEW LOAN</span>
                <nav className="header-actions" aria-label="Form actions">
                  <button type="button" onClick={() => setScreen("dashboard")}>My Dashboard</button>
                  <span aria-hidden="true">|</span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => { actionRef.current = "exit"; }}
                  >
                    Save &amp; Exit
                  </button>
                  <span aria-hidden="true">|</span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => { actionRef.current = "save"; }}
                  >
                    Save
                  </button>
                </nav>
              </header>

              {savedNotice && <div className="notice" role="status">{savedNotice}</div>}
              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <div className="validation-note" role="alert">
                  Please correct: {Object.keys(errors).map((name) => fieldLabels[name] || name).join(", ")}.
                </div>
              )}

              <main className="form-content">
                <section aria-labelledby="product-title">
                  <h2 id="product-title" className="section-heading">Product Detail</h2>
                  <div className="fields-grid">
                    <InputRow label="App Form No" name="appFormNo" readOnly />
                    <SelectRow label="Branch" name="branch" options={branches} />
                    <SelectRow label="Product" name="product" options={products} />

                    <SelectRow label="Scheme" name="scheme" options={schemes} />
                    <InputRow label="Application Dt" name="applicationDate" type="date" />
                    <SelectRow label="Type of Loan" name="loanType" options={loanTypes} />

                    <InputRow label="Loan Tenure" name="loanTenure" type="number" placeholder="Months" />
                    <div className="field-row">
                      <label htmlFor="relationshipManager">Relationship Mgr1</label>
                      <div className="control-group">
                        <div className="lookup-group">
                          <Field
                            id="relationshipManager"
                            name="relationshipManager"
                            type="text"
                            readOnly
                            aria-label="Selected relationship manager"
                          />
                          <button
                            type="button"
                            className="lookup-button"
                            aria-label="Choose relationship manager"
                            onClick={() => setManagerDialogOpen(true)}
                          >
                            ...
                          </button>
                        </div>
                      </div>
                    </div>
                    <InputRow label="Loan Amt" name="loanAmount" type="number" placeholder="Amount" />

                    <SelectRow label="Purpose/Sub-Scheme" name="purpose" options={purposes} />
                  </div>
                </section>
              </main>

              {managerDialogOpen && (
                <div className="dialog-backdrop" onClick={() => setManagerDialogOpen(false)}>
                  <div
                    className="dialog"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="manager-dialog-title"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <h3 id="manager-dialog-title">Choose Relationship Manager</h3>
                    {managers.map((manager) => (
                      <button
                        key={manager}
                        type="button"
                        className="manager-option"
                        onClick={() => {
                          setFieldValue("relationshipManager", manager);
                          setManagerDialogOpen(false);
                        }}
                      >
                        {manager}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="dialog-close"
                      onClick={() => setManagerDialogOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default App;
