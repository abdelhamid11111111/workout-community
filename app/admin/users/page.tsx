"use client";
import Sidebar from "@/app/components/admin/SideBar";
import Cards from "@/app/components/admin/users/Cards";
import Graph from "@/app/components/admin/users/Graph";
import Table from "@/app/components/admin/users/Table";


export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 pb-16 min-w-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
              Users
            </h1>
            <p className="mt-1 text-slate-500 text-sm">
              Manage and monitor all registered users.
            </p>
          </div>

          {/* KPI Cards */}
          <Cards />

          {/* Area Chart — New users last 7 days */}
          <Graph />

          {/* Table */}
          <Table/>
        </div>
      </div>
    </div>
  );
}
