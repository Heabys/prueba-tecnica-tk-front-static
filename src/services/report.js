/* eslint-disable no-unused-vars */
import fetchAPI from "./api";
const baseURL = process.env.VUE_APP_URL || "http://127.0.0.1:8080";

export const reportService = {
  async getReports() {
    // return fetchAPI("/api/get-reports");
    return {
      message: "Lista de reportes obtenidas correctamente",
      data: [
        {
          id: 1,
          title: "Reporte de usuario 1",
          created_at: "2022-01-01T00:00:00.000Z",
          report_link: `${baseURL}/reporte.xlsx`,
        },
        {
          id: 2,
          title: "Reporte de usuario 2",
          created_at: "2023-01-01T00:00:00.000Z",
          report_link: `${baseURL}/reporte.xlsx`,
        },
        {
          id: 3,
          title: "Reporte de usuario 3",
          created_at: "2024-01-01T00:00:00.000Z",
          report_link: `${baseURL}/reporte.xlsx`,
        },
      ],
    };
  },

  async generateReport(reportData) {
    // return fetchAPI("/api/generate-report", {
    //   method: "POST",
    //   body: JSON.stringify(reportData),
    // });
    return {
      message: "El reporte se está generando",
    };
  },

  getReportById(id) {
    // return fetchAPI(`/api/get-report/${id}`);
    return {
      message: "Reporte obtenido correctamente",
      data: {
        id: 1,
        title: "Reporte de usuario 1",
        created_at: "2022-01-01T00:00:00.000Z",
        report_link: `${baseURL}/reporte.xlsx`,
      },
    };
  },
};
