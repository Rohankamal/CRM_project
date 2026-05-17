# Enterprise Lead Management System (Mini CRM)

A high-performance, enterprise-grade full-stack Lead Management System (Mini CRM) engineered as part of the technical evaluation for the Full Stack Development Internship at Sankar Group. 

The application architecture features a sophisticated, glassmorphic cyber-tech user interface with asynchronous real-time data synchronization, live metrics tracking, an advanced localized search engine, and structured lifecycle status transitions.

---

## Tech Stack & Architecture

- **Frontend:** React.js (Component-Driven Architecture), React Icons, Axios (Asynchronous HTTP Client), Premium Custom Glassmorphic Inline CSS Styling Framework.
- **Backend:** Node.js, Express.js (RESTful API Architecture, Parameterized Data Access Routes).
- **Database:** PostgreSQL (Relational Database Management System, Structured Schema Integrity).

---

## Core Features & Implementation Detail

- **Lead Ingestion Engine (Form):** A fully validated input pipeline designed to capture essential client credentials including Name, Primary Contact Number, and Acquisition Channel Source (Direct Call, WhatsApp Business, or Field Marketing).
- **Interactive Management Archive (Table):** A streamlined tabular layout providing absolute visibility into data warehouse records directly fetched from the persistent backend engine.
- **Multi-State Lifecycle Transitions (Status Update):** Interactive structural triggers providing seamless transition parameters across all required administrative pipeline states: Interested, Not Interested, and Converted.
- **Data Purge Controller (Delete Lead):** Secure administrative API endpoint access to permanently delete lead allocations from the active database system.
- **Real-Time Analytics Counters (Bonus Dashboard):** Live database data aggregations instantly tracking metrics like Total Captured Leads and Successful Conversions.
- **Asynchronous Text Filter (Bonus Search):** A high-performance client-side query system allowing managers to filter data instantly by identity name or wire communication string.

---

## Local Installation & Deployment Configuration

Follow these step-by-step instructions to replicate the development environment locally:

### Database Initialization
Ensure PostgreSQL is installed and actively running on your local machine (Default Port: 5432). Access your query interface and execute the following schema architecture:

```sql
CREATE DATABASE crm_db;

CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    source VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Interested'
);
