import api from "./index";

export const getAdminData = async (activeTab) => {
  if (activeTab === "member-approval") {
    const response = await api.get(`/api/v1/admin/users/pending`);
    return response.data.users;
  } else if (activeTab === "company-approval") {
    const status = "WAITING";
    const response = await api.get(`/api/v1/admin/companies/status/${status}`);
    return response.data.companies;
  } else if (activeTab === "member-management") {
    const response = await api.get(`/api/v1/admin/users`);
    return response.data.users;
  } else if (activeTab === "company-management") {
    const response = await api.get(`/api/v1/admin/companies`);
    return response.data.companies;
  }
};

export const approveMember = async (username) => {
  const response = await api.put(`/api/v1/admin/users/${username}/status`, {
    newStatus: "APPROVED",
  });
  return response.data;
};

export const rejectMember = async (username) => {
  const response = await api.put(`/api/v1/admin/users/${username}/status`, {
    newStatus: "REJECTED",
  });
  return response.data;
};
export const suspendMember = async (username) => {
  const response = await api.put(`/api/v1/admin/users/${username}/status`, {
    newStatus: "WITHDRAWN",
  });
  return response.data;
};

export const approveCompany = async (companyId) => {
  const response = await api.put(`/api/v1/admin/companies/${companyId}`, {
    newStatus: "APPROVED",
  });
  return response.data;
};

export const rejectCompany = async (companyId) => {
  const response = await api.put(`/api/v1/admin/companies/${companyId}`, {
    newStatus: "REJECTED",
  });
  return response.data;
};
