# 🧾 ProjectInvoices.Client

An  **Angular** frontend for managing construction project invoices — from project and supplier and items setup, to invoice creation and approvals, and transactional payment handling. — powered by `ProjectInvoices.API` and `LoginManagement.API`.

This client demonstrates my skills in **frontend architecture**,  **secure API integration**, and building **real-world business workflows** with Angular.

---

## 🎯 Purpose

This application serves as a web-based interface for the `ProjectInvoices.API`, enabling users to:

- Authenticate and manage sessions via `LoginManagement.API`
- Create and manage invoices with items, suppliers, and projects
- Approve invoices and trigger payment flows
- Process payments via cash/check movements
- View, filter, and search through invoices, suppliers, and payments

The project is based on a real-world invoice system I helped develop during my role as a .NET Developer at a construction company in Syria, and was adapted for public demonstration as part of my portfolio.

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Angular** | Frontend framework (latest stable version) |
| **RxJS** | Reactive programming and API handling |
| **Angular Router** | SPA navigation and route guards |
| **Angular Forms** | Reactive form management |
| **Bootstrap / Angular Material** | UI components and styling |
| **JWT Auth Interceptor** | Token-based request authorization |
| **TypeScript** | Strong typing and clean codebase |

---

## 🔐 Authentication Flow

- Authenticates users via `LoginManagement.API`
- Stores JWT securely (e.g., in memory or session storage)
- Uses an **HTTP interceptor** to attach the JWT to outgoing requests
- Protects routes using **Auth Guards** based on user roles

---

## 🧭 Key Features

- **Role-based UI**: Different components and actions based on user roles (Setup entry, Invoice entry, Payment entry)
- **Invoice creation**: Select project and supplier, add existing items with quantity and price
- **Invoice approval**: Trigger suggested payments upon approval
- **Payment processing**:
  - Add single or grouped payments
  - Choose between cash/check movements
  - Select banks and accounts for checks
- **Search and Pagination**: Consistent paging and search across all objects
- **Form validation**: Client-side validation with real-time feedback
- **Error handling**: User-friendly error messages for API responses
- **Modular structure**: Organized by features with shared services and guards

---

## 🗃️ Folder Structure
src/
├── app/
│ ├── guards/ → For different roles
│ ├── projects/ → Projects management
│ ├── suppliers/ → Suppliers management
│ ├── projectinvoices/ → Invoices management and payments management UI
│ ├── security/ → Login and role handling

---

## 🧪 What I Focused On

- Modular, scalable code using **Angular best practices**
- Secure and smooth **JWT-based API communication**
- UX design for business workflows (approvals, financial processing)
- **reactive form handling** and UI validation
- Clean and maintainable component architecture

---

## 🧠 What the project covers

- Building production-style Angular apps with clear separation of concerns
- Integrating Angular securely with protected APIs
- Handling complex form inputs and dynamic form arrays
- Implementing client-side role-based UI restrictions
- Creating guards and interceptors

---

## 🚀 Getting Started

## ⚙️ How to Run (As a part of the system)
1. Node.js + Angular CLI
2. Run Login Management API: [Login Management API](https://github.com/AbdallaGeha)
3. Run Project Invoices API: [Project Invoices API](https://github.com/AbdallaGeha) 
4. Clone the repo  
   `git clone https://github.com/yourusername/ProjectInvoices.Client.git` or via Visual Studio Code
5. npm install
6. ng serve -o
7. Login to the system as admin using:
   User name: admin@admin.com
   Password: P@ssw0rd

## 👋 About Me

I'm a .net developer focused on building scalable, testable applications using modern .NET technologies. My proficiency includes C#, ASP.NET Core, Web API, MVC, and Entity Framework Core. Also, I have experience Delivering end-to-end solutions. My skills include HTML, CSS, JavaScript, and experience with popular front-end frameworks like Angular. I have many years of experience in designing and optimizing relational databases, with a strong understanding of SQL Server and experience in database modelling, stored procedures, and data manipulation.

This project highlights both my backend and frontend capabilities in a domain I’ve worked in professionally.

- 💼 [LinkedIn](https://www.linkedin.com/in/abdalla-geha-9664b62b7/)
- 📂 [More Projects](https://github.com/AbdallaGeha)
- 📧 Contact: abd_geha@hotmail.com

---


