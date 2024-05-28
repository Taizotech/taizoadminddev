/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
/* eslint-disable no-labels */
/* eslint-disable eqeqeq */
// import { parse } from "date-fns";
import { base_url, base_url_node, base_url_taizo } from "./App";
import {
  DDMMYYYY_formate,
  addDaysToDate,
  calculateAge,
  convertDateDDMMYYY,
  convertDateYYYYMMDD,
  convertTime,
  dateAndTimeFormate,
  dateFormate,
  dateFormateDD,
  dateFormateDDTT,
  getCurrentDateTime,
} from "./utility";

export async function UserLoginDetails(email, password) {
  // to get user login details
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url}/loginDetails?emailId=${email}&password=${password}`,
    req_obj
  );
  const data = await response.json();
  console.log(data);
  console.log("heloo");
  return data;
}
///////////////////////////////////////////

export async function UserNotificationDtails(page) {
  // to get all notification details
  const req_obj = { method: "GET" };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/callNotifications?page=${page}&size=10&adminId=${adminID}`,
    req_obj
  );
  const data = await response.json();
  console.log(data);
  return data;
}

///////////////////////////////////////////

export async function getJobFilterOptions() {
  // to get all filter options details
  const req_obj = { method: "GET" };
  const response = await fetch(`${base_url}/adminJobFilterOptions`, req_obj);
  const data = await response.json();
  console.log(data);
  return data;
}

////////////////////////////////////////////
export async function GetNotificationDetail(id) {
  // to get individual notification details
  if (id != 0) {
    const req_obj = { method: "GET" };
    const response = await fetch(
      `${base_url}/callNotificationById?id=${id}`,
      req_obj
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } else {
  }
}

export async function SetNotiReadStatus(id) {
  // to set notification read status
  if (id != 0) {
    const req_obj = { method: "PUT" };
    const response = await fetch(
      `${base_url}/notificationReadById?id=${id}`,
      req_obj
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } else {
  }
}
////////////////////////////////////////////
//employer api json
export async function postEmloyerPayment(employer) {
  console.log(employer);
  var raw = "";

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/empPayment?employer_id=${employer.payment_emp_id.val}&amount=${employer.payment_amount.val}&payment_id=${employer.payment_payment_id.val}&status=${employer.payment_status.val}&job_count=${employer.payment_plan_job_count.val}&plan_expiry_Days=${employer.payment_plan_expiry_days.val}&no_of_openings=${employer.payment_no_of_openings.val}&no_of_job_category=${employer.payment_no_of_job_category.val}&plan_id=${employer.payment_plan_id.val}&order_id=${employer.payment_order_id.val}`,
    requestOptions
  );
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function getFilteredJobs(filterObj) {
  // console.log(filterObj);
  let data;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let adminID = localStorage.getItem("adminID");

  let raw = JSON.stringify({
    assignTo: adminID == 10 ? 10 : -1,
    priority: filterObj.priority != null ? filterObj.priority : null,
    area: filterObj.area.length > 0 ? filterObj.area.join(",") : null,
    benefits:
      filterObj.benefits.length > 0 ? filterObj.benefits.join(",") : null,
    gender:
      filterObj.gender != null && filterObj.gender != ""
        ? filterObj.gender
        : null,
    industry:
      filterObj.industry.length > 0 ? filterObj.industry.join(",") : null,
    jobCategory:
      filterObj.jobCategory.length > 0 ? filterObj.jobCategory.join(",") : null,
    jobExp: filterObj.jobExp != -1 ? filterObj.jobExp : -1,
    jobMaxExp: filterObj.jobMaxExp != -1 ? filterObj.jobMaxExp : -1,
    jobLocation:
      filterObj.jobLocation.length > 0 ? filterObj.jobLocation.join(",") : null,
    keyskills:
      filterObj.keyskills.length > 0 ? filterObj.keyskills.join(",") : null,
    qualification:
      filterObj.qualification.length > 0
        ? filterObj.qualification.join(",")
        : null,
    salary: filterObj.salary != -1 ? filterObj.salary : -1,
    maxSalary: filterObj.maxSalary != -1 ? filterObj.maxSalary : -1,
    employerId: filterObj.employerId != "" ? filterObj.employerId : -1,
    companyName: filterObj.companyName != "" ? filterObj.companyName : "",
    pages: filterObj.pages,
    size: filterObj.size,
    createdTime: filterObj.createdTime,
    endDate: filterObj.endDate,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(`${base_url}/jobFilter`, requestOptions)
    .then((response) => (data = response.json()))
    .then((result) => console.log(result))
    .catch((error) => {
      data = "no data";
      console.log("error", error);
    });
  return data;
}

export async function getFilterJobDeatils(
  empId,
  companyName,
  gender,
  city,
  area,
  industry,
  jobCategory,
  benefits,
  skills,
  qualification,
  minSalary,
  maxSalary,
  minExp,
  maxExp,
  createdTime,
  endDate
) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/filterByJobDetails?${
      empId != null ? "employerId=" + empId + "&" : ""
    }${companyName != null ? "companyName=" + companyName + "&" : ""}// ${
      gender != null ? "gender=" + gender + "&" : ""
    }${city != null ? "city=" + city + "&" : ""}${
      area != null ? "area=" + area + "&" : ""
    }${industry != null ? "industry=" + industry + "&" : ""}${
      jobCategory != null ? "jobCategory=" + jobCategory + "&" : ""
    }${benefits != null ? "benefits=" + benefits + "&" : ""}${
      skills != null ? "skills=" + skills + "&" : ""
    }${qualification != null ? "qualification=" + qualification + "&" : ""}${
      minSalary != null ? "minSalary=" + minSalary + "&" : ""
    }${maxSalary != null ? "maxSalary=" + maxSalary + "&" : ""}${
      minExp != null ? "minExperience=" + minExp + "&" : ""
    }${maxExp != null ? "maxExperience=" + maxExp + "&" : ""}${
      createdTime != null ? "created_time=" + createdTime + "&" : ""
    }
    ${endDate != null ? "endDate=" + endDate + "&" : ""}page=1&pageSize=10`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getJobDetails(id) {
  console.log(base_url_taizo);

  // to set job details status
  if (id != 0) {
    const req_obj = { method: "GET" };
    const response = await fetch(`${base_url}/jobs/${id}`, req_obj);
    const data = await response.json();
    console.log(data);
    return data;
  }
}
export async function getcandidateDetails(id) {
  console.log(base_url_taizo);
  if (id != 0) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${base_url_taizo}/webEmployer/candidate/${id}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
}
// const formattedDateTime = getCurrentDateTime();
export async function postInterview_schedule(obj) {
  console.log(dateFormate(obj.date));
  var raw = "";

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/sendInterviewAlert?can_id=${obj.candidateId}&job_id=${
      obj.jobId
    }&interview_date=${dateFormate(
      obj.date
    ).trim()}&admin_id=${adminID}&candidatePercentage=${
      obj.candidatePercentage
    }&emergencyContactNumber=${obj.EmeregncyContactNumber}&relationshipType=${
      obj.Relationship
    }&relationName=${obj.RelationshipName}&date=${formattedDateTime}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutInterviewStatus(
  caninterviewid,
  statusField,
  date,
  willJoining,
  notes,
  ctc
) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminId = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/interviewStatus?id=${caninterviewid}&statusField=${statusField}&${
      date != "" ? "date=" + convertDateYYYYMMDD(date) + "&" : ""
    }notes=${notes}&ctc=${ctc}&adminId=${adminId}&statusFlag=true`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function postJobAlert(object) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/sendJobAlert?candidateId=${object.Candidateid}&jobId=${object.Jobid}`,
    requestOptions
  );
  const data = await response.text();
  return data;
}

// Get Job industries
export async function getJobIndustries() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url_taizo}/jobIndustries`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// Get job role
export async function getJobRole(id) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url_taizo}/fullTimeJobRoles?industry_id=${id}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

// Get key skills
export async function getKeySkills() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url_taizo}/keySkills`, requestOptions);
  const data = await response.json();
  return data;
}
//get department
export async function GetDepartments(endUrl) {
  // to get candidate registration status
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/${endUrl}`, reqObj);
  const data = await response.json();
  console.log(data, "Department");
  return data;
}
export async function GetStates() {
  try {
    const reqObj = {
      method: "GET",
    };
    const response = await fetch(`${base_url_taizo}/indiaStates`, reqObj);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error; // Re-throw the error to let the calling code handle it
  }
}

export async function GetCities(State_id) {
  try {
    const reqObj = {
      method: "GET",
    };
    const response = await fetch(
      `${base_url_taizo}/indiaStateCities?state_id=${State_id}`,
      reqObj
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching cities for state ${State_id}:`, error);
    throw error; // Re-throw the error to let the calling code handle it
  }
}

// to get language details
export async function Getlanguages() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/languages`, reqObj);
  const data = await response.json();

  return data;
}

// to get Courses details
export async function GetCourses() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/certificateCourses`, reqObj);
  const data = await response.json();

  return data;
}
export async function postCandidate(filterObj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  var raw = JSON.stringify({
    assignTo: filterObj.adminId,
    mobileNumber: filterObj.mobileNumber ? filterObj.mobileNumber : -1,
    gender: filterObj.gender != null ? filterObj.gender : null,
    industry:
      filterObj.industry.length > 0
        ? filterObj.industry.map((el) => el.options).join(",")
        : null,
    jobCategory:
      filterObj.jobCategory.length > 0
        ? filterObj.jobCategory.map((el) => el.options).join(",")
        : null,
    qualification:
      filterObj.qualification.length > 0
        ? filterObj.qualification.map((el) => el.options).join(",")
        : null,
    candidateType:
      filterObj.candidateType != null
        ? filterObj.candidateType.join(",")
        : null,
    skills:
      filterObj.skills.length > 0
        ? filterObj.skills.map((el) => el.options).join(",")
        : null,
    prefLocation:
      filterObj.prefLocation.length > 0
        ? filterObj.prefLocation.map((el) => el.options).join(",")
        : null,
    eligibility: filterObj.eligibility != null ? filterObj.eligibility : null,
    specification:
      filterObj.specification.length > 0
        ? filterObj.specification.join(",")
        : null,
    passed_out_year:
      filterObj.passed_out_year != -1 ? filterObj.passed_out_year : -1,
    experience: filterObj.experience != -1 ? filterObj.experience : -1,
    maxExperience: filterObj.maxExperience != -1 ? filterObj.maxExperience : -1,

    pages: filterObj.pages,
    size: filterObj.size,
    createdTime: filterObj.createdTime,
    endDate: filterObj.endDate,
    followUpDate1:
      filterObj.followUpDate1 != "" ? dateFormate(filterObj.followUpDate1) : "",
    followUpDate2:
      filterObj.followUpDate2 != "" ? dateFormate(filterObj.followUpDate2) : "",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/candidateFilter`, requestOptions);
  const data = await response.json();
  console.log(data, "response data in candidate filter");
  return data;
}

export async function updateCandidateform() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    mobileNumber: 879966444,
    firstName: "david",
    dateOfBirth: "1990-01-01",
    age: "32",
    gender: "Male",
    state: "California",
    city: "LosAngeles",
    whatsappNumber: 9876543210,
    qualification: "Bachelor'sDegree",
    specification: "ComputerScience",
    student: "Yes",
    isHavingArrear: "No",
    passed_out_year: 2020,
    expInManufacturing: false,
    experienced: true,
    candidateType: "Experienced",
    industry: "IT",
    jobCategory: "Software Developer",
    experience: 5,
    expMonths: 6,
    prefLocation: "Remote",
    pfEsiAccount: "Yes",
    certificationCourses: "JavaCertification",
    keySkill: "Java,Spring,Hibernate",
    reference: "JohnDoe",
    knownLanguages: "1,3",
    languageKey: "en",
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateCandidateRegister?canId=1`,
    requestOptions
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

//refernce
export async function GetCandidateSources() {
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/candidatesources`, reqObj);
  const data = await response.json();

  return data;
}
export async function GetCandidateidornumber(candidateidnum) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/candidates/${candidateidnum}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetEmployerFilterDetails(obj) {
  console.log(obj);
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: obj.id != "" ? obj.id : null,
    companyName: obj.companyName != "" ? obj.companyName : null,
    industry: obj.industry != "" ? obj.industry : null,
    noOfEmployees: obj.noOfEmployees != "" ? obj.noOfEmployees : null,
    city: obj.city != "" ? obj.city : null,
    area: obj.area != "" ? obj.area : null,
    page: obj.page,
    size: obj.size,
    createdTime: obj.createdTime != "" ? obj.createdTime : null,
    endDate: obj.endDate != "" ? addOneDate(obj.endDate) : null,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url}/filterByEmployerDetails?${
      obj.contactNumber != "" ? "contactNumber=" + obj.contactNumber : ""
    }`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "gi");
  return data;
}

export async function GetEmployerDetailsByid(id) {
  if (id != 0) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `${base_url_taizo}/webEmployer/empDetails?emp_id=${id}`,
      requestOptions
    );
    const data = await response.json();
    // console.log(data)
    return data;
  }
}
export async function GetemployerPayment(employerId, page) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/employerPayments?${
      employerId != "" ? "employerId=" + employerId + "&" : ""
    }page=${page}&size=10`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetCandidateCallRegistry(page, jobId) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url}/candidateCallLogs?${
      jobId != null ? "jid=" + jobId + "&" : ""
    }page=${page}&size=20`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}
export async function GetEmployerCallRegistry(page, jobid) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/empCallRegistry?${
      jobid != null ? "jid=" + jobid + "&" : ""
    }&page=${page}&size=10`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetCandidateLead(object) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  var raw = JSON.stringify({
    profilePageNo: object.profilePageNo != "" ? object.profilePageNo : null,
    fromSource: object.fromSource != "" ? object.fromSource : null,
    jobCategory: object.jobCategory != "" ? object.jobCategory : null,
    mobileNumber: object.mobileNumber != "" ? object.mobileNumber : null,
    expYears: object.expYears != "" ? object.expYears : null,
    maxExperience: object.maxExperience != "" ? object.maxExperience : null,
    status: object.status != "" ? object.status : null,
    scheduledBy: object.adminId,
    createdTime: object.createdTime != "" ? object.createdTime : null,
    endDate: object.endDate != null ? addOneDate(object.endDate) : null,
    page: object.page,
    size: object.size,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(`${base_url}/canLeadfilter`, requestOptions);
  const data = await response.json();
  return data;
}
export async function GetEmloperByNumber(Number) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url}/checkMobileNo?mobileNumber=${Number}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}
export async function GetKycDetailsLis(obj) {
  var raw = "";

  var requestOptions = {
    method: "GET",
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/viewKYCDocuments?page=${obj.page}&start_date=${obj.start_date}&end_date=${obj.start_date}&size=10`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}
export async function PostProformaInvoice(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let totalNumberOfOpenings = 0;
  obj.jobDetails.forEach((el) => {
    totalNumberOfOpenings =
      parseInt(totalNumberOfOpenings) + parseInt(el.noOfOpenings);
  });

  console.log(DDMMYYYY_formate(addDaysToDate(parseInt(obj.linkValidity))));
  console.log(addDaysToDate(parseInt(obj.linkValidity)));

  const adminId = localStorage.getItem("adminID");

  var raw = JSON.stringify({
    adminId: adminId,
    mobileNumber: obj.mobileNumber,
    emailId: obj.email != "" ? obj.email : null,
    originalAmount: obj.amount,
    invoiceAmount: obj.discountAmount,
    invoiceDate: convertDateDDMMYYY(new Date()),
    companyName: obj.companyName,
    contactPersonName: obj.contactName,
    gstnumber: obj.gstNumber,
    address: obj.address,
    discountInPercentage: obj.discountPercentage,
    jobDetails: JSON.stringify(obj.jobDetails),
    noOfOpenings: totalNumberOfOpenings,
    paymentLinkValidityDate: convertDateDDMMYYY(
      addDaysToDate(parseInt(obj.linkValidity))
    ),
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/proFormaInvoice`, requestOptions);
  const data = await response.json();
  return data;
  //   console.log(data);
}

export async function GetcanInterviews(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  var raw = JSON.stringify({
    // adminId: obj.adminId,
    jobId: obj.jobId != "" ? obj.jobId : 0,
    contactNumber: obj.contactNumber != "" ? obj.contactNumber : null,
    candidateMobileNumber:
      obj.candidateMobileNumber != "" ? obj.candidateMobileNumber : 0,
    companyName: obj.companyName != "" ? obj.companyName : null,
    interviewDate: obj.interviewDate != "" ? obj.interviewDate : null,
    interviewEndDate: obj.interviewEndDate != "" ? obj.interviewEndDate : null,
    jobCategory: obj.jobCategory != "" ? obj.jobCategory : null,
    area: obj.area != "" ? obj.area : null,
    city: obj.city != "" ? obj.city : null,
    interviewCurrentStatus:
      obj.interviewStatus != "" ? obj.interviewStatus : -1,
    adminId: obj.scheduledBy != "" ? obj.scheduledBy : 0,
    page: obj.page,
    size: obj.size,
    createdTime: obj.createdTime != "" ? obj.createdTime : null,
    endDate: obj.endDate != "" ? addOneDate(obj.endDate) : null,
  });
  //dateFormate(obj.interviewDate)
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/canInterviews`, requestOptions);
  const data = await response.json();
  return data;
}

export async function GetCanMidLevellist(obj, status) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  console.log(obj, "GetCanMidLevellist");

  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  const response = await fetch(
    `${base_url}/canMidSeniorFilter?${
      obj.educationQualification != ""
        ? "educationQualification=" + obj.educationQualification + "&"
        : ""
    }${obj.jobCategory ? "jobCategory=" + obj.jobCategory + "&" : ""}${
      obj.experienceInManufacturing != ""
        ? "experienceInManufacturing=" +
          JSON.stringify(obj.experienceInManufacturing == "yes") +
          "&"
        : ""
    }${
      obj.preferredJobLocation != ""
        ? "preferredJobLocation=" + obj.preferredJobLocation + "&"
        : ""
    }${obj.mobileNumber != "" ? "mobileNumber=" + obj.mobileNumber + "&" : ""}${
      obj.joiningDate != "" ? "joiningDate=" + obj.joiningDate + "&" : ""
    }${
      obj.currentlyWorking != ""
        ? "currentlyWorking=" +
          JSON.stringify(obj.currentlyWorking == "yes") +
          "&"
        : ""
    }${
      obj.maxExperience != "" ? "maxExperience=" + obj.maxExperience + "&" : ""
    }${
      obj.minExperience != "" ? "minExperience=" + obj.minExperience + "&" : ""
    }status=${status}&${
      obj.createdTimeEnd != ""
        ? "createdTimeEnd=" + addOneDate(obj.createdTimeEnd) + "&"
        : ""
    }${
      obj.createdTimeStart != ""
        ? "createdTimeStart=" + obj.createdTimeStart + "&"
        : ""
    }page=${obj.page}&pageSize=${obj.pageSize}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "PostRescheduleInterviews");
  return data;
}
export async function GetCanMidLevePopup(midCandidateId) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/listMidSenior?midCandidateId=${midCandidateId}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "PostRescheduleInterviews");
  return data;
}
export async function PostRescheduleInterviews(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    interviewId: obj.interviewId,
    reScheduledOn: obj.reScheduledOn,
    // notes: obj.notes,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/rescheduleInterviewRequest?notes=${obj.notes}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "PostRescheduleInterviews");
  return data;
}
export async function GetemployerRating(rating, page) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/empRatingsCount?${
      rating != "" ? "rating_count=" + rating + "&" : ""
    }page=${page}&size=10`,
    requestOptions
  );
  const data = await response.json();
  // console.log(data, "Rating for Employer");
  return data;
}

export async function GetEmployerDraft(emp_id, page) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/draftJobsPagination?employer_id=${emp_id}&page=${page}&size=10`,
    requestOptions
  );
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function GetJobLeadtable(obj) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/jobLeads?${
      obj.employerId != "" ? "employerId=" + obj.employerId + "&" : ""
    }page=${obj.page}&size=${obj.size}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

// export async function GetJobLeadtable(employerId, page) {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   const response = await fetch(
//     `${base_url}/jobLeads?${
//       employerId != "" ? "employerId=" + employerId + "&" : ""
//     }page=1&size=10`,
//     requestOptions
//   );
//   const data = await response.json();
//   return data;
// }

export async function GetPlanDetails(type) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url_taizo}/webEmployer/placementPlans?type=${type}&emp_id=1`,
    requestOptions
  );
  const data = await response.json();
  return data;
}
export async function postEmployerLead(leadData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    emailId: leadData.emailId.val != null ? leadData.emailId.val : null,
    // paymentDays:
    //   leadData.paymentDays.val != null ? leadData.paymentDays.val : null,
    mobileNumber:
      leadData.mobileNumber.val != null ? leadData.mobileNumber.val : null,
    mobileCountryCode: "+91",
    fromAdmin: true,
    companyName:
      leadData.companyName.val != null ? leadData.companyName.val : null,
    contactPersonName:
      leadData.contactPersonName.val != null
        ? leadData.contactPersonName.val
        : null,
    industry: leadData.industry.val != null ? leadData.industry.val : null,
    city: leadData.city.val != null ? leadData.city.val : null,
    notes: leadData.notes.val != null ? leadData.notes.val : null,
    address: leadData.address.val != null ? leadData.address.val : null,
    titles: leadData.title.val != null ? leadData.title.val : null,
    createdTime: leadData.createdTime,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/employerLead?admin_id=${
      leadData.fromAdminId.val != "" ? leadData.fromAdminId.val : adminID
    }&ccMail=${leadData.ccMail.val}&paymentDays=${leadData.paymentDays.val}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetEmployerLead(input) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/leadDetails?input=${input}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}
export async function Getdashboard(time, module) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/dashboardAnalytics?time=${time}&module=${module}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function GetTotalPrevilegesList() {
  // to get total privileges list
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/getPrivileges`, requestOptions);
  const data = await response.json();

  return data;
}

export async function GetAdminDetailsByID(adminID) {
  // to get individual admin details by adminID
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/detailsById?adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "DATA");
  return data;
}

// Employer Enquiry list api post method
export async function GetEmployerEnquiry(employerData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    mobileNumber:
      employerData.mobileNumber != "" ? employerData.mobileNumber : null,
    companyName:
      employerData.companyName != "" ? employerData.companyName : null,
    emailId: employerData.emailId != "" ? employerData.emailId : null,
    createdTime:
      employerData.createdTime != "" ? employerData.createdTime : null,
    endDate: employerData.endDate != "" ? employerData.endDate : null,
    page: employerData.page,
    size: employerData.size,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(
    `${base_url}/filterByEmpEnquiry`,
    requestOptions
  );
  const data = await response.json();
  // console.log(data);

  return data;
}

export async function PostPaymentDetails(obj) {
  var myHeaders = new Headers();
  let admin_id = localStorage.getItem("adminID");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("admin_id", admin_id);
  urlencoded.append("employer_id", obj.employerID);
  urlencoded.append("payment_id", obj.paymentID != "" ? obj.paymentID : null);
  urlencoded.append("job_details", JSON.stringify(obj.jobDetails));
  urlencoded.append(
    "payment_method",
    obj.paymentMethod != "" ? obj.paymentMethod : null
  );
  urlencoded.append(
    "cheque_date",
    obj.chequeDate != "" ? convertDateYYYYMMDD(obj.chequeDate) : null
  );

  urlencoded.append("cheque_no", obj.chequeNo != "" ? obj.chequeNo : 0);
  urlencoded.append("amount", obj.amount != "" ? obj.amount : 0);
  console.log(urlencoded);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/employerPayment`, requestOptions);

  const data = await response.json();

  return data;
}

export async function GetTotalAdminRoles() {
  // to get total admin roles list
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/adminRoles`, requestOptions);
  const data = await response.json();
  return data;
}

export async function PostAdminNewUser(Details) {
  let updatedSelectedAdminPrivileges = Details.selectedAdminPrivileges.val.map(
    (el) => {
      return {
        privilegeId: el.id,
        create: el.create,
        read: el.read,
        update: el.update,
        delete: el.delete,
      };
    }
  );

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    userName: Details.userName.val != null ? Details.userName.val : null,
    emailId: Details.userEmail.val != null ? Details.userEmail.val : null,
    password: Details.password.val != null ? Details.password.val : null,
    mobileNo: Details.userMobile.val != null ? Details.userMobile.val : null,
    roleId: Details.userRole.val.id != null ? Details.userRole.val.id : null,
    module: Details.userModule.val != null ? Details.userModule.val : null,
    privileges: updatedSelectedAdminPrivileges,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/addUser`, requestOptions);
  const data = await response.json();
  return data;
}

export async function GetProformaInvoice(object) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    employerId: object.employerId != "" ? object.employerId : "",
    companyName: object.companyName != "" ? object.companyName : "",
    mobileNumber: object.mobileNumber != "" ? object.mobileNumber : "",
    page: object.page,
    size: 10,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/filterByProformaInvoice`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "Proforma Invoice data");
  return data;
}

export async function PutAdminAvailability(object) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url}/adminAvailability?emailId=${object.emailId}&isAvailable=${object.available}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetAdminByMobileNumberOrEmail(obj) {
  // to find admin by mobile number or email if already registered
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url}/findAdmin?${
      obj.mobileNo != null ? "mobileNo=" + obj.mobileNo + "&" : ""
    }${obj.emailId != null ? "emailId=" + obj.emailId : ""}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetEmployerUnpublished(employer_id, page) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/unPublishedJob?${
      employer_id != "" ? "employer_id=" + employer_id + "&" : ""
    }page=${page}&size=10`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetEmployerLeadList(obj) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  const response = await fetch(
    `${base_url}/empLeadFromAdmin?${
      obj.mobile_number != "" ? "mobile_number=" + obj.mobile_number + "&" : ""
    }${obj.email_id != "" ? "email_id=" + obj.email_id + "&" : ""}${
      obj.city != "" ? "city=" + obj.city + "&" : ""
    }${obj.industry != "" ? "industry=" + obj.industry + "&" : ""}${
      obj.company_name != "" ? "company_name=" + obj.company_name + "&" : ""
    }${
      obj.createdTimeStart != ""
        ? "createdTimeStart=" + obj.createdTimeStart + "&"
        : ""
    }${
      obj.createdTimeEnd != ""
        ? "createdTimeEnd=" + addOneDate(obj.createdTimeEnd) + "&"
        : ""
    }page=${obj.page}&size=${obj.size}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

// export async function GetEmployerLeadList(obj) {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   const response = await fetch(
//     `${base_url}/empLeadFromAdmin?mobile_number=${obj.number}&email_id=${obj.email}&page=${obj.page}&size=${obj.size}`,
//     requestOptions
//   );
//   const data = await response.json();
//   return data;
// }
export async function PostDailyReports(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let raw;
  let adminID = localStorage.getItem("adminID");
  switch (obj.module.val) {
    case "JobSeeker":
      raw = JSON.stringify({
        adminId: adminID,
        module: obj.module.val,
        canQualifiedCount: obj.canQualifiedCount.val,
        canNotQualifiedCount: obj.canNotQualifiedCount.val,
        canTotalChatCount: obj.canTotalChatCount.val,
      });
      break;
    case "Employer":
      raw = JSON.stringify({
        adminId: adminID,
        module: obj.module.val,
        empFollowUpCount: obj.empFollowUpCount.val,
        empQualifiedCount: obj.empQualifiedCount.val,
        empNotQualifiedCount: obj.empNotQualifiedCount.val,
        canQualifiedCount: obj.canQualifiedCount.val,
        canNotQualifiedCount: obj.canNotQualifiedCount.val,
        canTotalChatCount: obj.canTotalChatCount.val,
      });
      break;
    case "EmployerField":
      raw = JSON.stringify({
        adminId: adminID,
        module: obj.module.val,
        empFieldFollowUpCount: obj.empFieldFollowUpCount.val,
        empFieldFollowUpVisitCount: obj.empFieldFollowUpVisitCount.val,
        empFieldNewVisitCount: obj.empFieldNewVisitCount.val,
        empFieldNewLeadCount: obj.empFieldNewLeadCount.val,
        empFieldNoOfPaymentCount: obj.empFieldNoOfPaymentCount.val,
      });
      break;
    default:
      break;
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/dailyReports?module=${obj.module.val}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}
export async function Postcallregistry(obj) {
  let adminID = localStorage.getItem("adminID");
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/callRegistry?admin_id=${adminID}&candidate_id=${
      obj.candidate_id
    }&employer_id=${obj.employer_id}&call_time=${dateAndTimeFormate(
      obj.call_time
    )}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}
// ${
//       obj.candidate_id != null
//         ? "candidate_id=" + obj.candidate_id + "&"
//         : "candidate_id=" + null + "&"
//     }${
//       obj.employer_id != null
//         ? "employer_id=" + obj.employer_id + "&"F
//         : "employer_id=" + null + "&"
//     }

export async function GetprofileDashboard(date) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/analyticsFilter?adminId=${adminID}&startDate=${dateFormate(
      date.startDate
    ).trim()}&endDate=${dateFormate(date.endDate).trim()}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

// export async function GetprofileDashboard(date) {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };
//   let adminID = localStorage.getItem("adminID");
//   const response = await fetch(
//     `${base_url}/analyticsFilter?adminId=${adminID}&startDate=2023-09-28&endDate=2023-09-28`,
//     requestOptions
//   );
//   const data = await response.json();
//   return data;
// }

export async function PutRetentionByAdminId(id) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/retentionByAdminId?id=${id}&adminId=${adminID}&retention=true`,
    requestOptions
  );
  const data = await response.json();
  return data;
}
export async function postCandidateLead(leadData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const adminId =parseInt(localStorage.getItem("adminID"));
  let adminID = localStorage.getItem("adminID");
  var raw = JSON.stringify({
    // admin_id: "5",
    mobileNumber:
      leadData.mobileNumber.val != null ? leadData.mobileNumber.val : null,
    name: leadData.name.val != null ? leadData.name.val : null,
    lastName: leadData.lastName.val != null ? leadData.lastName.val : null,
    // gender: leadData.gender.val != null ? leadData.gender.val : null,
    gender: "Male",
    state: leadData.state.val.state != null ? leadData.state.val.state : null,
    prefLocation:
      leadData.city.val.city != null ? leadData.city.val.city : null,
    experienced:
      leadData.experienced.val != null
        ? leadData.experienced.val == "yes"
        : null,
    whatsappNumber: leadData.whatsapp.val,
    dateOfBirth: leadData.DOB.val,
    prefArea: leadData.area.val != null ? leadData.area.val : null,
    jobCategory: leadData.JobRole.val != null ? leadData.JobRole.val : null,
    fromSource: leadData.source.val != null ? leadData.source.val : null,
    // assignedTo: leadData.assignto.val != null ? leadData.assignto.val : null,
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/canLead?adminId=${adminID}&assignedTo=${
      leadData.assignto.val != null ? leadData.assignto.val : null
    }`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "thtthghghghghgghg");

  return data;
}

// fetch("${base_url}canLead?adminId=5", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

export async function GetCandidateLeadform(number) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  //   fetch("${base_url}numberCheck?number=876545678765", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));

  const response = await fetch(
    `${base_url}/numberCheck?number=${number}`,
    requestOptions
  );
  const data = await response.json();
  // console.log(data, "thtthghghghghgghg");

  return data;
}

export async function Putprofile(files, profiles) {
  console.log(profiles, "admin Detailssssssssssss ");
  var formdata = new FormData();
  if (files) {
    formdata.append("pic", files, "[PROXY]");
  }

  var requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  console.log(adminID, "haii this is admin id");
  const response = await fetch(
    `${base_url}/profiles?admin_id=${adminID}&user_name=${profiles.name}&mobile_number=${profiles.mobileNumber}&email_id=${profiles.email}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data, "profile update");

  return data;
}
export async function PostCanTimeLine(data) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  let obj = data;

  try {
    const response = await fetch(
      `${base_url}/canTimeLine?canId=${obj.canId}&adminId=${adminID}&eventName=${obj.eventType}&notes=${obj.notes}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function PostCanLeadTimeLine(data) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  let obj = data;

  try {
    const response = await fetch(
      `${base_url}/canLeadTimeLine?canLeadId=${obj.canId}&adminId=${adminID}&eventName=${obj.eventType}&notes=${obj.notes}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function PostFacebookLeadTimeLine(data) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  let obj = data;

  try {
    const response = await fetch(
      `${base_url}/fbTimeLine?fbId=${obj.facebookId}&adminId=${adminID}&eventName=${obj.eventType}&notes=${obj.notes}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export async function PostEmployerTimeLine(data) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  let obj = data;

  try {
    const response = await fetch(
      `${base_url}/employerTimeline?empId=${obj.empId}&adminId=${adminID}&eventName=${obj.eventType}&notes=${obj.notes}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function PostEmpLeadTimeLine(data) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  let obj = data;

  try {
    const response = await fetch(
      `${base_url}/employerLeadTimeLine?empLeadId=${obj.empLeadId}&adminId=${adminID}&eventName=${obj.eventType}&notes=${obj.notes}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GetCanTimeline(obj, page) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/candidateTimeline?${
        obj.canId != null ? `canId=${obj.canId}&` : ""
      }page=${page}&size=5${
        obj.eventType ? "&eventName=" + obj.eventType : ""
      }${
        obj.startDate ? "&startDate=" + convertDateYYYYMMDD(obj.startDate) : ""
      }${
        obj.endDate ? "&endDate=" + convertDateYYYYMMDD(obj.endDate) : ""
      }&adminId=${adminID}${
        obj.canLeadId ? "&canLeadId=" + obj.canLeadId : ""
      }${obj.facebookId ? "&facebookId=" + obj.facebookId : ""}${
        obj.midSeniorSorcingId
          ? "&midSeniorSorcingId=" + obj.midSeniorSorcingId
          : ""
      }${obj.midSeniorCanId ? "&midSeniorCanId=" + obj.midSeniorCanId : ""}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GetEmpTimeline(empId, obj) {
  // to get employer Timeline
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/employerTimeline?${
        empId != null ? `empId=${empId}&` : ""
      }page=${obj.page}&size=5${
        obj.eventName ? "&eventName=" + obj.eventName : ""
      }${
        obj.startDate ? "&startDate=" + convertDateYYYYMMDD(obj.startDate) : ""
      }${
        obj.endDate ? "&endDate=" + convertDateYYYYMMDD(obj.endDate) : ""
      }&adminId=${adminID}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GetEmpLeadTimeline(empLeadId, obj) {
  // to get employer Timeline
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/employerTimeline?${
        empLeadId != null ? `empLeadId=${empLeadId}&` : ""
      }page=${obj.page}&size=5${
        obj.eventName ? "&eventName=" + obj.eventName : ""
      }${
        obj.startDate ? "&startDate=" + convertDateYYYYMMDD(obj.startDate) : ""
      }${
        obj.endDate ? "&endDate=" + convertDateYYYYMMDD(obj.endDate) : ""
      }&adminId=${adminID}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GetEmpTimelineEvents(active) {
  // to get employer Timeline

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/empEvents?${active ? "active=" + true : ""}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function PutCandidateLeadCheck(putLead) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/canLeadStatus?canLeadId=${putLead.canLeadId}&adminId=${adminID}&qualified=${putLead.qualified}&notQualified=${putLead.notQualified}&callNotAttend=${putLead.callNotAttend}&notes=${putLead.notes}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutEmployerLeadCheck(putEmployerLead) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/empLeadStatus?empLeadId=${putEmployerLead.empLeadId}&adminId=${adminID}&qualified=${putEmployerLead.qualified}&notQualified=${putEmployerLead.notQualified}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutCandidateIsQualified(obj) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/canStatus?canId=${
      obj.candidateId
    }&adminId=${adminID}&qualified=${
      obj.isQualified
    }&notQualified=${!obj.isQualified}&notes=${obj.notes}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutEmployerIsQualified(obj) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/empStatus?empId=${obj.empId}&adminId=${adminID}&qualified=${
      obj.isQualified
    }&notQualified=${!obj.isQualified}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutFBmetaIsQualified(obj, notes) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  try {
    let adminID = localStorage.getItem("adminID");
    const response = await fetch(
      `${base_url}/fbMetaLeads?id=${obj.id}&qualified=${obj.qualified}&notQualified=${obj.notQualified}&notAttend=${obj.notAttend}&adminId=${adminID}&notes=${notes}`,
      requestOptions
    );
    //
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function GetCanTimeLineEvents() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/canEvents`, requestOptions);
  const data = await response.json();

  return data;
}

export async function PutCandidateLeadAssigntoAdmin(assignAdmin) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  // let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/moveTOAssign?canleadId=${assignAdmin.canleadId}&adminId=${assignAdmin.adminId}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function GetAllsdminDetails() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  // admin details

  const response = await fetch(`${base_url}/list`, requestOptions);
  const data = await response.json();

  return data;
}

export async function PostCandidateFBmeta(candidateFormData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  var raw = JSON.stringify({
    assignTo: candidateFormData.adminId,
    mobileNumber:
      candidateFormData.mobileNumber != ""
        ? candidateFormData.mobileNumber
        : null,
    candidateName:
      candidateFormData.candidateName != " "
        ? candidateFormData.candidateName
        : null,
    educationQualification:
      candidateFormData.educationQualification != " "
        ? candidateFormData.educationQualification
        : null,
    jobCategory:
      candidateFormData.jobCategory != ""
        ? candidateFormData.jobCategory
        : null,
    experience:
      candidateFormData.experience != "" ? candidateFormData.experience : null,
    preferredLocation:
      candidateFormData.preferredLocation != ""
        ? candidateFormData.preferredLocation
        : null,
    joiningAvailability:
      candidateFormData.joiningAvailability != ""
        ? candidateFormData.joiningAvailability
        : null,
    pages: candidateFormData.pages,
    size: candidateFormData.size,
    createdTime:
      candidateFormData.createdTime != "" ? candidateFormData.createdTime : "",
    endDate:
      candidateFormData.endDate != ""
        ? addOneDate(candidateFormData.endDate)
        : "",
    notAttend: candidateFormData.notAttend == "Not Attend",
    notQualified: candidateFormData.notAttend == "Not Qualifed",
    noStatus: candidateFormData.noStatus == "No Status",
    dailyTask: candidateFormData.followUp == "Follow Up",
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/filterByMetaLeads?`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "candidate data Fb meta");
  return data;
}

export async function GetdiplomaCourses() {
  // to get candidate registration status
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/diplomaCourses`, reqObj);
  const data = await response.json();
  console.log(data, "Department diplomaCourses");
  return data;
}
export async function GetITICourses() {
  // to get candidate registration status
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/ITICourses`, reqObj);
  const data = await response.json();
  console.log(data, "Department ITICourses");
  return data;
}
export async function GetUGCourses() {
  // to get candidate registration status
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/UGCourses`, reqObj);
  const data = await response.json();
  console.log(data, "Department UGCourses");
  return data;
}
export async function GetPGCourses() {
  // to get candidate registration status
  const reqObj = {
    method: "GET",
  };
  const response = await fetch(`${base_url_taizo}/PGCourses`, reqObj);
  const data = await response.json();
  console.log(data, "Department PGCourses");
  return data;
}

export async function PutMetaLeadAssign(assignAdminto) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/metaLeadAssignTo?metaLeadId=${assignAdminto.metaLeadId}&adminId=${assignAdminto.adminId}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "Department PGCourses");
  return data;
}
export async function PutCandidateAssignto(Assinto) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/moveTOCandidate?candidateId=${Assinto.candidateId}&adminId=${Assinto.adminId}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "Department PGCourses");
  return data;
}
export async function PostJobRoleInCfgTable(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    industryId: 8,
    jobRoles: obj.jobRole,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/fullTimeJobRoles`, requestOptions);
  const data = await response.json();
  return data;
}

// export async function GetJobRoles(obj) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify({
//     industryId: 8,
//     jobRoles: obj.jobRole,
//   });

//   var requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   const response = await fetch(
//     `${base_url}/fullTimeJobRoles?page=1&size=40`,
//     requestOptions
//   );
//   const data = await response.json();
//   return data;
// }

export async function UpdateJobRoles(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: obj.id,
    industryId: 1,
    ...(obj.jobRole != null ? { jobRoles: obj.jobRole } : {}),
    ...(obj.active != null ? { active: obj.active } : {}),
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/fullTimeJobRoles`, requestOptions);
  const data = await response.json();
  return data;
}

export async function PostInvoiceSend(paymentId) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/invoice?paymentId=${paymentId}`,
    requestOptions
  );
  const data = await response.text();
  console.log(data, "paymentId");
  return data;
}

export async function PostEmpFieldLeadsFilter(data, pageDetails) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    companyName: data.companyName,
    area: data.area,
    leadImageLink: data.leadImageLink,
    city: data.city,
    createdTime: data.createdTime,
    endDate: data.endDate,
    pages: pageDetails.page,
    size: pageDetails.size,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${base_url}/employerFeildList`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// export async function GetExotelDetails(obj) {
//   var requestOptions = {
//     method: "GET",
//     redirect: "follow",
//   };

//   fetch(
//     `https://dev.taizo.in/exotel/fetch-data?page=${}&pageSize=10&sid=`,
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

// var formdata = new FormData();

// var requestOptions = {
//   method: "POST",
//   body: formdata,
//   redirect: "follow",
// };

// fetch(
//   "https://dev.taizo.in/admin/employerFieldLead?companyName=zoho&city=tambaram&area=tambaram",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

export async function PostAddFieldLead(companyInfo) {
  const adminID = localStorage.getItem("adminID");

  // Create form data
  const formdata = new FormData();
  formdata.append("companyName", companyInfo.companyName);
  formdata.append("area", companyInfo.area);
  formdata.append("city", companyInfo.city);
  formdata.append("mobileNumber", companyInfo.mobileNumber);
  formdata.append("alternateMobileNumber", companyInfo.alternativeMobileNumber);
  formdata.append("whatsappNumber", companyInfo.whatsappNumber);
  formdata.append("file", companyInfo.photo);
  formdata.append("emailId", companyInfo.email);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/employerFieldLead?adminId=${adminID}`,
    requestOptions
  );

  const data = await response.json();
  return data;
}

export async function getAddFieldLead(companyName) {
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url}/employerFieldLead?companyName=${companyName}`,
    req_obj
  );

  const data = await response.json();
  return data;
}

export async function getCandidateDocument() {
  const req_obj = { method: "GET" };
  const response = await fetch(`${base_url}/listCanDocuments`, req_obj);

  const data = await response.json();
  return data;
}

export async function PutCandidateDocument(
  mobileNumber,
  docType,
  adminID,
  file
) {
  const formData = new FormData();
  formData.append("mobileNumber", mobileNumber);
  formData.append("docType", docType);
  formData.append("adminId", adminID);
  formData.append("file", file);

  const req_obj = {
    method: "PUT",
    body: formData,
  };

  try {
    const response = await fetch(`${base_url}/docUpload`, req_obj);
    if (!response.ok) {
      throw new Error("Something wen wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // alert("Something went wrong")
  }
}

export async function getDocumentCandidate(id) {
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url}/canDocument?candidateId=${id}`,
    req_obj
  );

  const data = await response.json();
  return data;
}

export async function PostSlaMail(obj) {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      empId: obj.empId,
      empLeadId: obj.empLeadId,
      adminId: obj.fromAdminId.val,
      replacementMonths: obj.ReplacementPolicy,
      paymentDueDays: obj.PaymentTerms,
      feePercentage: obj.RecruitmentFeePercentage,
      paymentType: obj.PaymentType,
      ccEmailId: obj.ccEmailId,
      ToEmail: obj.toEmail,
    }),
    redirect: "follow",
  };

  try {
    let response = await fetch(
      `${base_url_node}/admin/sendSLAtoEmployer`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}

export async function PostEmployerSlaEmail(obj) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  const response = await fetch(
    `
    ${base_url}/sendSLAToemployer?id=${obj.id}&recruitmentFeePercentage=${obj.RecruitmentFeePercentage}&recruitmentFeeType=${obj.PaymentType}&paymentDuration=${obj.PaymentTerms}&replacementDuration=${obj.ReplacementPolicy}&adminId=${obj.fromAdminId.val}&ccMail=${obj.ccMail}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function UpdateMetaLeads(obj, id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    candidateName: obj.name,
    whatsappNumber: obj.whatsappNumber,
    id: id,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${base_url}/updateMetaLeads`, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}

export async function getCandidateLead(id) {
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url}/canLeads?candidateId=${id}`,
    req_obj
  );

  const data = await response.json();
  return data;
}

export async function PutAssignTo(jobId, adminId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/moveToJobAssign?jobId=${jobId}&adminId=${adminId}`,
    requestOptions
  );

  const data = await response.json();
  return data;
}

export async function GetPrefferedAreaList(cityId) {
  const req_obj = { method: "GET" };

  try {
    const response = await fetch(
      `${base_url}/assignArea?cityId=${cityId}`,
      req_obj
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}

// to preferred cities details
export async function GetPreferredCities() {
  const reqObj = {
    method: "GET",
  };
  try {
    const response = await fetch(
      `${base_url_taizo}/webEmployer/cities?state_id=0`,
      reqObj
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}

// to preferred cities details
export async function PostIntroMail(obj) {
  const reqObj = {
    method: "POST",
  };
  try {
    const response = await fetch(
      `${base_url}/sendIntroMail?id=${obj.leadId}&adminId=${
        obj.fromAdminId.val
      }&ccMail=${obj.ccMail.val ? obj.ccMail.val : ""}&paymentDays=${
        obj.paymentDays.val ? obj.paymentDays.val : null
      }`,
      reqObj
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}
export async function PostIntroMailEmployer(obj) {
  const reqObj = {
    method: "POST",
  };
  try {
    const response = await fetch(
      `${base_url}/empIntroMail?id=${obj.Empid}&adminId=${
        obj.fromAdminId.val
      }&ccMail=${obj.ccMail.val ? obj.ccMail.val : ""}&paymentDays=${
        obj.paymentDays.val ? obj.paymentDays.val : null
      }`,
      reqObj
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}

export async function PutCandidateSenior(putLead) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/midSeniorCandidate?id=${
      putLead.canLeadId
    }&adminId=${adminID}&${
      putLead.qualified != undefined
        ? "qualified=" + putLead.qualified + "&"
        : ""
    }${
      putLead.notQualified != undefined
        ? "notQualified=" + putLead.notQualified + "&"
        : ""
    }${
      putLead.shortlisted != undefined
        ? "shortlisted=" + putLead.shortlisted + "&"
        : ""
    }notes=${putLead.notes}&${
      putLead.eventType != undefined ? "eventName=" + putLead.eventType : ""
    }`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetEventTypeMidSenior() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/eventDetail`, requestOptions);
  const data = await response.json();
  return data;
}
// let response = await fetch(
//   "https://dev.taizo.in/admin/sendIntroMail?id=218&adminId=1&ccMail=ayhtadi%40gmail.com",
//   {
//     method: "POST",
//     body: bodyContent,
//     headers: headersList,
//   }
// );

export async function GetInterviewListByJobId(obj) {
  // Set today's date
  const today = new Date();

  // Calculate yesterday's date
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Format dates in 'YYYY-MM-DD' format
  const StartDate = convertDateYYYYMMDD(yesterday);
  const EndDate = convertDateYYYYMMDD(today);
  const reqObj = {
    method: "GET",
  };

  try {
    // const response = await fetch(
    //   `${base_url}/interviewScheduledCandidates?jobId=${obj.jobId}&startDate=${StartDate}&endDate=${EndDate}&size=30&page=0`,
    //   reqObj
    // );

    const response = await fetch(
      `${base_url}/interviewScheduledCandidates?jobId=${obj.jobId}&startDate=${obj.startDate}&endDate=${obj.endDate}&size=50&page=0`,
      reqObj
    );

    http: if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Network response was not ok" + error);
  }
}

export async function PutMIDSENIPORLEVEL(formData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Assuming formData.file is a File object
  var resumeLink = formData.file ? formData.file.name : null;
  let adminId = localStorage.getItem("adminID");

  var raw = JSON.stringify({
    adminId: adminId,
    firstName: formData.Name,
    lastName: formData.Initial,
    emailId: formData.EmailId,
    mobileNumber: formData.MobileNumber,
    educationalQualification: formData.EduacationalQualification,
    prefJobLocation: formData.PrefredLocation,
    expInManufacturing: formData.Manufacturing,
    // expInYears: formData.years,
    // expInMonths: formData.months,
    expInYears: formData.years !== "" ? formData.years + "year(s)" : null,
    expInMonths: formData.months !== "" ? formData.months + "month(s)" : null,
    jobCategory: formData.currentjobposition,
    resumeLink: resumeLink, // Use the file name or link here
    linkedinUrl: formData.LinkedinUrl,
    noticePeriod: formData.DropdownField3,
    expectedSalary: formData.expecetdsealary,
    currentSalary: formData.currentsalary,
    currentlyWorking: formData.currentlyworking,
    currentLocation: formData.CurrentLocation,
    whatsappNumber:
      formData.WhatsupNumber != "" ? formData.WhatsupNumber : null,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/basicMidLevelSenior`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function UploadMidSeniorResume(file, mobileNumber, LinkedinUrl) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formData = new FormData();
  formData.append("file", file);

  const reqObj = {
    method: "PUT",
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/updateProfileResumeMidSenior?mobileNumber=${mobileNumber}&linkedinUrl=${LinkedinUrl}`,
      reqObj
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error}`);
  }
}

// send email alert to employer

export async function SendInterviewAlertToEmployer(obj) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const reqObj = {
    method: "POST",
  };

  try {
    const response = await fetch(
      `${base_url}/sendInterviewDetails?jobId=${obj.jobId}&adminId=${
        obj.adminId
      }&emailId=${obj.emailId}&candidateIds=${obj.selectedRow.join(",")}`,
      reqObj
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! Status`);
  }
}
export async function GetMidSeniorDetails(mobileNumber) {
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url}/midSeniorDetails?mobileNumber=${mobileNumber}`,
    req_obj
  );
  const data = await response.json();
  console.log(data);
  console.log("heloo");
  return data;
}

export async function GetJoinedCandidate(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let adminId = localStorage.getItem("adminID");
  function addOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() + 1);
    return convertDateYYYYMMDD(dateValue);
  }
  var raw = JSON.stringify({
    adminId: obj.adminId,
    // adminId: adminId,
    companyName: obj.companyName,
    contactNumber: obj.contactNumber,
    createdTime: obj.createdTime,
    leftTheCompany: obj.leftTheCompany,
    endDate: obj.endDate,
    joinedOn: obj.joinedOn,
    joinedEnd: obj.joinedEnd != null ? addOneDate(obj.joinedEnd) : null,
    page: obj.page,
    size: obj.size,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/candidateJoined`, requestOptions);
  const data = await response.json();
  console.log(data);

  return data;
}

export async function postMidSeniorReportGeneration(formData, candidate) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    titles: formData.candidates || "",
    age: formData.age || 0,
    candidateName: formData.candidateName || "",
    certifications: formData.certifications || "",
    coreSkillSetMatchingJd: formData.coreSkillSetMatchingJd || "",
    lookingFor: formData.lookingFor || "",
    previousDesignation: formData.previousDesignation || "",
    qualification: formData.qualification || "",
    skills: formData.skills || "",
    taizoScore: formData.taizoScore || "",
    taizoSuggestion: formData.taizosSuggestion || "",
    yearsOfExperience: formData.yearsOfExperience || "",
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/reportGenerationMidSenior?id=${candidate}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in postMidSeniorCatogoryBasicDetails API:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function GetDownloadReport(midSeniorId) {
  let adminId = localStorage.getItem("adminID");
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url_node}/admin/midSeniorReport?midSeniorId=${midSeniorId}&adminId=${adminId}`,
    req_obj
  );
  const data = await response.arrayBuffer();

  return data;
}

export async function GetMidSeniorReport(candidateId) {
  const req_obj = { method: "GET" };
  const response = await fetch(
    `${base_url}/reportGenerationDetails?id=${candidateId}`,
    req_obj
  );
  const data = await response.json();
  console.log(data);
  console.log("heloo");
  return data;
}

export async function getEmployerDocument() {
  const req_obj = { method: "GET" };
  const response = await fetch(`${base_url}/empDocuments`, req_obj);

  const data = await response.json();
  return data;
}

export async function PostEmployerDocument(empId, docTitle, adminID, file) {
  const formData = new FormData();
  formData.append("file", file);

  const req_obj = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(
      `${base_url}/empDocUpload?docTitle=${docTitle}&empId=${empId}&adminId=${adminID}`,
      req_obj
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors appropriately, e.g., display an alert
    console.error("Error in PostEmployerDocument:", error);
    throw error; // Propagate the error to the calling function
  }
}

export async function GetAnalyticsFunnel(admin, obj) {
  // let adminid = localStorage.getItem("adminID");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  // ${adminid}
  const response = await fetch(
    `${base_url}/candidateFunnel?adminId=${admin}&startDate=${obj.startDate}&endDate=${obj.endDate}&stage=${obj.stage}`,
    // `${base_url}/candidateFunnel?adminId=${admin}&startDate=2024-02-26&endDate=2024-03-03&stage=${obj.stage}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function PostInvoiceSendJoinedCandidate(obj) {
  var formdata = new FormData();
  // formdata.append("invoiceAttachment", obj.invoiceAttachment.val.files[0]);
  if (obj.invoiceAttachment.val) {
    const file = obj.invoiceAttachment.val;
    if (file) {
      formdata.append("invoiceAttachment", file);
    } else {
      console.error("No valid file found in obj.invoiceAttachment.val.files");
    }
  } else {
    console.error(
      "obj.invoiceAttachment.val or obj.invoiceAttachment.val.files is undefined"
    );
  }

  let adminId = localStorage.getItem("adminID");
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/sendInvoice?empId=${obj.empId.val}&contactPersonName=${
      obj.contactPersonName.val
    }&adminId=${adminId}&invoiceNumber=${
      obj.invoiceNumber.val
    }&invoiceDate=${dateFormateDD(obj.invoiceDate.val).trim()}&invoiceAmount=${
      obj.invoiceAmount.val
    }&dueDate=${dateFormateDD(obj.dueDate.val).trim()}&emailId=${
      obj.emailId.val
    }`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function PostMoveToScreening(id, obj) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/moveToScreening?id=${id}&screeningDate=${convertDateDDMMYYY(
      obj.screeningDate
    )}&screeningTime=${convertTime(obj.screeningTime)}&meetingLink=${
      obj.meetingLink
    }`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function getAllDocumentEmployer(Id) {
  const req_obj = { method: "GET" };
  const response = await fetch(`${base_url}/empDoc?empId=${Id}`, req_obj);

  const data = await response.json();
  return data;
}

export async function UploadMidSeniorResumes(file, mobileNumber) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formData = new FormData();
  formData.append("file", file);

  const reqObj = {
    method: "PUT",
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${base_url}/updateProfileResumeMidSenior?mobileNumber=${mobileNumber}`,
      reqObj
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error}`);
  }
}
export async function PostmoveToShortlisted(id) {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/moveToShortlisted?id=${id}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);

  return data;
}

export async function updateMetaSeenStatus(id, seen) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/seenStatus?id=${id}&isSeen=true`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);

  return data;
}

export async function EmailUpdateInMidSenior(emailId, mobileNumber) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let adminId = localStorage.getItem("adminID");
  var raw = JSON.stringify({
    emailId: emailId,
    mobileNumber: mobileNumber,
    admnId: adminId,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/basicMidLevelLead`, requestOptions);

  const data = await response.json();
  console.log(data);

  return data;
}

export async function PostsendToEmployer(obj, midSeniorId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let adminId = localStorage.getItem("adminID");
  var raw = JSON.stringify({
    midSeniorDetails: obj.midSeniorDetails,
    empContactName: obj.empContactName,
    adminId: obj.adminId,
    // midSeniorId: midSeniorId,
    toEmail: obj.toEmail,
    ccEmailId: obj.ccEmailId,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url_node}/admin/midSeniorReportToEmp`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}
export async function SendEmailCandidate(midSeniorId, emailID, CcEmailId) {
  let adminId = localStorage.getItem("adminID");
  // const req_obj = { method: "GET" };
  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  // const raw = JSON.stringify({
  //   midSeniorId: midSeniorId,
  //   adminId: adminId,
  //   toemail: emailID,
  //   ccEmailId: CcEmailId,
  // });

  // const requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: "follow",
  // };
  // const response = await fetch(
  //   `${base_url_node}/admin/midSeniorReport`,
  //   requestOptions
  // );
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url_node}/admin/midSeniorReport?midSeniorId=${midSeniorId}&adminId=${adminId}&toEmail=${emailID}&ccEmailId=${CcEmailId}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);
  return data;
}

export async function PutCandidateLeadAssignto(Assinto) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/moveTOCandidateLead?candidateLeadId=${Assinto.candidateId}&adminId=${Assinto.adminId}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "Department PGCourses");
  return data;
}

export async function PutMidSeniorSourcing(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    adminId: localStorage.getItem("adminID"),
    mobileNumber: obj.mobileNumber.val,
    firstName: obj.firstName.val,
    lastName: obj.lastName.val,
    emailId: obj.emailId.val,
    appliedJobrole: obj.appliedJobrole.val,
    jobrole: obj.jobrole.val,
    experienceInYears: obj.experienceInYears.val,
    experienceInMonths: obj.experienceInMonths.val,
    skills: obj.skills.val,
    currentLocation: obj.currentLocation.val,
    preferredJobLocation: obj.preferredJobLocation.val,
    adminPreferredCompany: obj.adminPreferredCompany.val,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/midSeniorSourcing`, requestOptions);
  const data = await response.json();
  console.log(data, "PutMidSeniorSourcing");
  return data;
}

export async function PutMidSeniorSourcingResume(resume, mobileNumber) {
  var formdata = new FormData();
  if (resume) {
    const file = resume;
    if (file) {
      formdata.append("resume", file);
    } else {
      console.error("No valid file found in resume.files");
    }
  } else {
    console.error("resume or resume.files is undefined");
  }
  var requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/midSeniorSourcingResume?mobileNumber=${mobileNumber}&adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data, "PutMidSeniorSourcing");
  return data;
}

export async function QualifyJobRole() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url_taizo}/fullTimeJobRoles?industry_id="1"`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function PostQualifyCandidate(
  formData,
  mobileNumber,
  followUpDate,
  notes
) {
  var myHeaders = new Headers();
  const adminID = localStorage.getItem("adminID");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    candidateQualifiedModel: {
      appliedJobrole: formData.appliedJobrole,
      canSuitableJobLocation: formData.canSuitableJobLocation,

      adminSuggestedSalary: formData.adminSuggestedSalary,

      companyLocation: formData.companyLocation,
      companyName: formData.companyName,
      currentCandidateLocation: formData.currentCandidateLocation,
      currentStayType: formData.currentStayType,
      currentlyWorking: formData.currentlyWorking,
      education: formData.education,
      expectedSalary: formData.expectedSalary,
      experienceInMonth: formData.experienceInMonth,
      experienceInYear: formData.experienceInYear,
      experienced: formData.experienced,
      havingJobLocation: formData.havingJobLocation,
      havingSalaryProof: formData.havingSalaryProof,
      havingUpdatedCV: formData.havingUpdatedCV,
      havingWorkGap: formData.havingWorkGap,
      havingEducationalGap: formData.havingEducationalGap,
      immediateJoiner: formData.immediateJoiner,
      industry: formData.industry,
      isCourseCompleted: formData.isCourseCompleted,
      isMechanicalRelatedDegree: formData.isMechanicalRelatedDegree,
      jobType: formData.jobType,
      jobWorkHours: formData.jobWorkHours,
      jobrole: formData.jobrole,
      needAccommodation: formData.needAccommodation,
      needTransport: formData.needTransport,
      noticePeriod: formData.noticePeriod,
      overallExperience: formData.overallExperience,
      preferredJobLocation: formData.preferredJobLocation,
      readyForShifts: formData.readyForShifts,
      readyToRelocate: formData.readyToRelocate,
      reasonForJobChange: formData.reasonForJobChange,
      salaryExpectationAdminPreference:
        formData.salaryExpectationAdminPreference,
      salaryProofDocumentType: formData.salaryProofDocumentType,
      // skillsCertifications: formData.skillsCertifications,
      specialization: formData.specialization,
      takeHomeSalary: formData.takeHomeSalary,
      workForSuggestedSalary: formData.workForSuggestedSalary,
    },
    candidateModel: {
      emergencyContactNumber: formData.emergencyContactNumber,
      relationshipType: formData.relationshipType,
      relationName: formData.relationName,
      mobileNumber: formData.mobileNumber,
      whatsappNumber: formData.whatsappNumber,
      currentCity: formData.currentCity,
      currentState: formData.currentState,
      dateOfBirth: formData.dateOfBirth,
      age: calculateAge(formData.dateOfBirth),
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      keySkill: formData.keySkill,
      certificationCourses: formData.certificationCourses,
      knownLanguages: formData.knownLanguages,
      reference: formData.reference,
      pFEsiaccount: formData.pFEsiaccount,
      passed_out_year: formData.passed_out_year,
    },
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `${base_url}/qualifiedCan?mn=${mobileNumber}&adminId=${adminID}&followUpDate=${dateFormateDDTT(
        followUpDate
      ).trim()}&notes=${notes}`,

      // `${base_url}/qualifiedCandidate?mn=${mobileNumber}&adminId=1`,

      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function GetMidseniorSourcing(obj) {
  const adminID = localStorage.getItem("adminID");

  const queryParamsObj = {
    adminId: obj.adminId,
    firstName: obj.firstName || "",
    lastName: obj.lastName || "",
    emailId: obj.emailId || "",
    mobileNumber: obj.mobileNumber || "",
    appliedJobrole: obj.appliedJobrole || "",
    jobrole: obj.jobrole || "",
    currentLocation: obj.currentLocation || "",
    preferredJobLocation: obj.preferredJobLocation || "",
    createdTimeStart: obj.createdTimeStart || "",
    createdTimeEnd: obj.createdTimeEnd || "",
    page: obj.page,
    pageSize: obj.pageSize,
  };

  // Remove keys with empty or undefined values
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(queryParamsObj)) {
    if (value !== "" && value !== undefined) {
      queryParams.append(key, value);
    }
  }

  const requestOptions = { method: "GET", redirect: "follow" };
  const response = await fetch(
    `${base_url}/midSeniorSourcingFilter?${queryParams}`,
    requestOptions
  );
  const data = await response.json();

  console.log(data, "GetMidSeniorSourcing");
  return data;
}
// ---------------------------------------------------------------

export async function GetcalendlyMeeting(mailId) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let response = await fetch(
    `${base_url}/canlendlyDetails?emailId=${mailId}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}

export async function PutMidsoucingQualifyMail(obj) {
  const adminID = localStorage.getItem("adminID");

  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/midSeniorSourcingStatus?id=${obj.id}&adminId=${adminID}&qualified=${obj.qualified}&notQualified=${obj.notQualified}&notes=${obj.notes}`,
    requestOptions
  );
  const data = await response.json();

  console.log(data, "pustatusMidSeniorSourcing");
  return data;
}

export async function PutClosedJobs(jobId) {
  const adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/closeJob?adminId=${adminID}&jobId=${jobId}`,
    requestOptions
  );
  const data = await response.json();

  console.log(data, "PutClosedJobs");
  return data;
}

export async function AllEducationDegree() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/allCourses`, requestOptions);
  const data = await response.json();
  console.log(data);
  return data;
}
export async function GetQualifiedForm(id, candidateId) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    // `${base_url}/getQualifiedForm?id=${id}`,
    `${base_url}/getQualifiedForm?${id ? "id=" + id + "&" : ""}${
      candidateId ? "candidateId=" + candidateId : ""
    }`,
    // `${base_url}/getQualifiedForm?id=204`,
    // ${id ? "fbMetaId=" + id + "&" : ""}
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetInterviewDetails(id) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/interviewDetails?interviewId=${id}`,
    // `${base_url}/getQualifiedForm?id=204`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function PostFollowup(
  id,
  canLeadId,
  canId,
  formattedDate,
  followUpTime,
  notes,
  followUptype
) {
  const adminID = localStorage.getItem("adminID");
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/followupStatus?${id ? "fbMetaId=" + id + "&" : ""}${
      canLeadId ? "canLeadId=" + canLeadId : ""
    }${
      canId ? "canId=" + canId : ""
    }&followUpDate=${formattedDate}&followUpTime=${followUpTime}&notes=${notes}&followUpType=${followUptype}&adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);

  return data;
}

export async function GetFollowUpDetails(id) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/dailyTaskDetails?fbId=${id}`,
    // `${base_url}/getQualifiedForm?id=204`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetFollowUpEvents() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/followUpEvents`, requestOptions);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetLeadRegisterfunnel(obj) {
  const adminID = localStorage.getItem("adminID");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/candidateStageOneFunnel?adminId=${adminID}&startDate=${obj.startDate}&endDate=${obj.endDate}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function GetCandidateDailyTask(obj) {
  const adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/candidateDailyTasks?startDate=${obj.startDate}&endDate=${
      obj.endDate
    }&adminId=${adminID}&currentStatus=${obj.currentStatus}&page=${
      obj.page
    }&size=10${obj.followUpType ? "&followUpType=" + obj.followUpType : ""}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function UpdateCandidateDailyTask(obj) {
  const adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/followUpStatus?id=${obj.id}&currentStatus=${obj.currentStatus}&adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getKeySkillss() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/keySkills`, requestOptions);

  const data = await response.json();
  console.log(data);
  return data;
}

export async function UpdateKeySkills(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: obj.id,
    ...(obj.skill != null ? { skill: obj.skill } : {}),
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/keySkills`, requestOptions);
  const data = await response.json();
  return data;
}

export async function PostKeySkillsInCfgTable(obj) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    skill: obj.skill,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/keySkills`, requestOptions);
  const data = await response.json();
  return data;
}

export async function DeleteKeySkills(id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/keySkills?id=${id}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetRolesAndAccess() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let adminId = localStorage.getItem("adminID");

  const response = await fetch(
    `${base_url}/roleAccess?adminId=${adminId}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);
  return data;
}
export async function PutCandidateName(obj) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: obj.id,
    firstName: obj.canFirstName,
    lastName: obj.canLastName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateCandidateName`,
    requestOptions
  );
  const data = await response.text();
  console.log(data);
  return data;
}
export async function PostinterviewInactive(caninterviewid) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formdata = new FormData();

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/interviewInactive?id=${caninterviewid}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export async function PostBugFixer(taskDescription, taskName, taskType) {
  var myHeaders = new Headers();
  let adminID = localStorage.getItem("adminID");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    taskDescription: taskDescription,
    taskName: taskName,
    taskType: taskType,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/bugFixer?adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function UploadBugFixerImage(file, id) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formData = new FormData();
  formData.append("file", file);

  const reqObj = {
    method: "PUT",
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${base_url}/uploadPhoto?id=${id}`, reqObj);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error}`);
  }
}

export async function GetBugfixerView(obj) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/getBugFixers?id=${obj.id}&${
      obj.priority != "" ? "priority=" + obj.priority + "&" : ""
    }${obj.status != "" ? "status=" + obj.status + "&" : ""}${
      obj.assignedTo != null ? "assignedTo=" + obj.assignedTo + "&" : ""
    }page=${obj.page}&size=${obj.size}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutBugFixerStatusUpdate(obj) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: obj.bugId,
    status: obj.bugstatus,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/bugFixers`, requestOptions);
  const data = await response.text();
  console.log(data);
  return data;
}

export async function GetAdminDeveloper() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/getAdmin?module=Developer`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutBugFixerForm(requestBody) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
    redirect: "follow",
  };

  const response = await fetch(`${base_url}/bugFixers`, requestOptions);
  const data = await response.text();
  console.log(data);
  return data;
}

export async function PutBugFixerInactive(bugId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/bugFixerInActive?id=${bugId}`,
    requestOptions
  );
  const data = await response.text();
  console.log(data);
  return data;
}

export async function PutMoveAssignBugFixer(bugId, assignedTo) {
  const myHeaders = new Headers();
  let adminID = localStorage.getItem("adminID");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/moveToAssignBugFixer?id=${bugId}&adminId=${adminID}&assignedTo=${assignedTo}`,
    requestOptions
  );
  const data = await response.text();
  // console.log(data);
  return data;
}

export async function updateCanleadSeenStatus(id) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/seenStatusCanLead?id=${id}&isSeen=true`,
    requestOptions
  );

  const data = await response.json();
  console.log(data, "sdfsadnsdnsdfj");

  return data;
}
export async function GetCanLeadPipeline(obj) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // to hide the empty keynames
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/canLeadPipelineFilter?${queryParams}&size=10`;

  const data = await fetch(url, requestOptions);

  const response = data.json();
  return response;
}

export async function GetCandidatePipeline(obj) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  // to hide the empty keynames
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/candidatePipelineFilter?${queryParams}&size=10`;

  const data = await fetch(url, requestOptions);

  const response = data.json();
  return response;
}

export async function UpdateCanPipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/pipeline1StageStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}
export async function UpdateFollowup1PipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/followup1StageStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}
export async function UpdateFollowup2PipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/followup2StageStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}

export async function UpdateAttendingPipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/interviewAttendingStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}
export async function UpdateAttendedPipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/interviewAttendedPipeline?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}
export async function Updatefollowup1JoiningPipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/followup1JoiningStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}
export async function Updatefollowup2JoiningPipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/followup2JoiningStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}

export async function UpdatejoiningDayPipelineStatus(obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const adminID = localStorage.getItem("adminID");
  const objKeys = Object.keys(obj);
  const filteredKeys = objKeys.filter((key) => obj[key] !== "");

  const queryParams = filteredKeys
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  const url = `${base_url}/joiningDayStatus?${queryParams}&adminId=${adminID}`;

  let data = await fetch(url, requestOptions);
  let response = await data.json();
  return response;
}

// Qualify Form Accordion API PUT and GET ---- START----
// import { dateFormate } from "./utility";

export async function PutCandidateType(type, mobileNumber, notes) {
  const adminID = localStorage.getItem("adminID");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    experienced: type,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/candidateType?mn=${mobileNumber}&adminId=${adminID}&notes=${notes}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}
export async function PutFresherStatus(position, mobileNumber) {
  //   const adminID = localStorage.getItem("adminID");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    jobCategory: position,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherStatus?mn=${mobileNumber}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  console.log("heloo");
  return data;
}

export async function putFresherSalarayDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    expectedSalary: obj.expectedSalary,
    expectedSalaryIs: obj.expectedSalaryIs,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherSalaryDetails?mn=${mobilenumber}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);
  return data;
}
export async function PutFresherExpertise(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // const raw = JSON.stringify({
  //   keySkill: obj.keySkill.map((option) => option.label).join(","),
  //   courses:
  //     obj.courses !== ""
  //       ? obj.courses.map((option) => option.label).join(",")
  //       : null,
  // });

  const raw = JSON.stringify({
    keySkill: Array.isArray(obj.keySkill)
      ? obj.keySkill.map((option) => option.label).join(",")
      : null,
    courses:
      Array.isArray(obj.courses) && obj.courses.length > 0
        ? obj.courses.map((option) => option.label).join(",")
        : null,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherExpertiseDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutFresherJobLocation(prefLocation, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    prefLocation: prefLocation.map((option) => option.label).join(","),
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherJobLocation?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutFresherEducationalDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    // qualification: Education,
    // specification: Specialization != "" ? Specialization : "",
    // passed_out_year: CompletedYear != "" ? CompletedYear : "",
    // isHavingArrear: EducationArrear != "" ? EducationArrear : "",
    qualification: obj.qualification,
    specification: obj.specification,
    passed_out_year: obj.passed_out_year,
    isHavingArrear: obj.isHavingArrear,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherEducationDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutFresherBasicDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: obj.name,
    lastName: obj.lastName,
    dateOfBirth: obj.dateOfBirth,
    whatsappNumber: obj.whatsappNumber,
    city: obj.city,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherBasicDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}
export async function PutFresherEmergencyDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    emergencyContactNumber: obj.emergencyContactNumber,
    relationName: obj.relationName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherEmergencyDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}
export async function PutFresherOtherDetails(
  RotationalShift,
  Accomodation,
  CvResume,
  Refference,
  // tentativeInterviewDate,
  // followUpDate1,
  notes,
  mobilenumber
) {
  // let formattedFollowUpDate1 = "";
  // if (followUpDate1 !== "Invalid date") {
  //   formattedFollowUpDate1 = dateFormate(followUpDate1);
  // }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const referenceLabel = Refference.label;
  const adminID = localStorage.getItem("adminID");
  const raw = JSON.stringify({
    readyForShifts: RotationalShift,
    needAccommodation: Accomodation,
    reference: Refference,
    havingUpdatedCv: CvResume,
    // tentativeInterviewDate:
    //   dateFormate(tentativeInterviewDate) == "Invalid date"
    //     ? ""
    //     : dateFormate(tentativeInterviewDate),
    // followUpDate1:
    //   dateFormate(followUpDate1) == "Invalid date"
    //     ? ""
    //     : dateFormate(followUpDate1),
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/fresherOtherDetails?mn=${mobilenumber}&adminId=${adminID}&${
      notes !== "" ? "notes=" + notes : null
    }`,
    requestOptions
  );
  const data = await response.json();

  //
  return data;
}

export async function PutExperiencecurrentStatus(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const ReasonForJobchangeLabel = ReasonForJobchange.label;

  const raw = JSON.stringify({
    reason_for_jobchange:
      obj.reason_for_jobchange !== "" ? obj.reason_for_jobchange.label : null,
    reason_for_unemployment:
      obj.reason_for_unemployment !== ""
        ? obj.reason_for_unemployment.label
        : null,
    jobCategory: obj.jobCategory,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceCurrentStatus?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutExperiencedetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    industry: obj.industry.label,
    expMonths: obj.expMonths,
    expYears: obj.expYears,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutExperienceWorkDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    companyName: obj.companyName,
    companyLocation: obj.companyLocation,
    jobTypeMode: obj.jobTypeMode,
    jobRole: obj.jobRole,
    jobWorkHours: obj.jobWorkHours,
    noticePeriod: obj.noticePeriod,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceCurrentWorkDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutExperienceSalaryDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    takeHomeSalary: obj.takeHomeSalary,
    salaryProofDocumentType: obj.salaryProofDocumentType,
    expectedSalary: obj.expectedSalary,
    expectedSalaryIs: obj.expectedSalaryIs,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceSalaryDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutEducationalDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    qualification: obj.qualification,
    specification: obj.specification,
    passed_out_year: obj.passed_out_year,
    isHavingArrear: obj.isHavingArrear,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceEducationDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutExperienceExpertiseDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    keySkill: obj.keySkill.map((option) => option.label).join(","),
    courses:
      obj.courses !== ""
        ? obj.courses.map((option) => option.label).join(",")
        : null,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceExpertiseDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutexperienceJobLocationDetails(
  prefLocation,
  PfEsiAccountRadio,
  mobilenumber
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    prefLocation: prefLocation.map((option) => option.label).join(","),
    pfEsiAccount: PfEsiAccountRadio,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceJobLocationDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutexperienceBasicDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: obj.name,
    lastName: obj.lastName,
    mobileNumber: obj.mobileNumber,
    whatsappNumber: obj.whatsappNumber,
    dateOfBirth: obj.dateOfBirth,
    city: obj.city,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceBasicDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutexperienceEmergencyDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    emergencyContactNumber: obj.emergencyContactNumber,
    relationName: obj.relationName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceEmergencyDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutexperienceOtherDetails(
  RotationalShift,
  Accomodation,
  CvResume,
  Refference,
  // tentativeInterviewDate,
  // followUpDate1,
  notes,
  mobilenumber
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const referenceLabel = Refference.label;
  const adminID = localStorage.getItem("adminID");
  const raw = JSON.stringify({
    readyForShifts: RotationalShift,
    needAccommodation: Accomodation,
    reference: referenceLabel,
    notes: notes !== "" ? notes : null,
    havingUpdatedCv: CvResume,
    // tentativeInterviewDate:
    //   dateFormate(tentativeInterviewDate) == "Invalid date"
    //     ? ""
    //     : dateFormate(tentativeInterviewDate),
    // followUpDate1:
    //   dateFormate(followUpDate1) == "Invalid date"
    //     ? ""
    //     : dateFormate(followUpDate1),
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceOtherDetails?mn=${mobilenumber}&adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutExperienceStatus(mobilenumber, currentlyWorking) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/experienceStatus?mn=${mobilenumber}&currentlyWorking=${currentlyWorking}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetCandidateQualifyDetials(mobileNumber) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/getCanDetails?mn=${mobileNumber}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function GetCandidateQualifyForm(mobileNumber) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/getCandidateDetails?mobileNumber=${mobileNumber}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

// Qualify Form Accordion API PUT and GET ---- END------

export async function PutCandidateInterviewFollowup(
  id,
  obj,
  selectedCompany,
  selectedJobCategory,
  Rescheduled
) {
  let adminID = localStorage.getItem("adminID");
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  function minusOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() - 1);
    return convertDateYYYYMMDD(dateValue);
  }
  const response = await fetch(
    `${base_url}/tentativeInterviewDate?id=${id}&adminId=${adminID}&${
      obj.tentativeInterviewDate != ""
        ? "tentativeInterviewDate=" +
          dateFormate(obj.tentativeInterviewDate) +
          "&"
        : ""
    }${
      obj.followUpDate1 != null
        ? "followupdate=" + dateFormate(obj.followUpDate1)
        : null
    }&${
      selectedCompany !== ""
        ? "suggestedCompanyName=" + encodeURIComponent(selectedCompany)
        : ""
    }&${
      selectedJobCategory !== ""
        ? "jobCategory=" + encodeURIComponent(selectedJobCategory)
        : ""
    }&Rescheduled=${Rescheduled}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutCandidateJoinedFollowUp(id, obj) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  function minusOneDate(date) {
    let dateValue = new Date(date);
    dateValue.setDate(dateValue.getDate() - 1);
    return convertDateYYYYMMDD(dateValue);
  }
  let adminID = localStorage.getItem("adminID");
  const response = await fetch(
    `${base_url}/tentativeJoiningDate?id=${id}&adminId=${adminID}&${
      obj.tentativeJoinedDate != ""
        ? "tentativeJoinedDate=" + dateFormate(obj.tentativeJoinedDate) + "&"
        : ""
    }${
      obj.followUpDate1 != null
        ? "followupdate=" + dateFormate(obj.followUpDate1)
        : null
    }`,
    requestOptions
  );
  const data = await response.json();
  return data;
}
export async function PutMetaLeadAssignToAdmin() {
  let adminId = localStorage.getItem("adminID");

  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  let data = await fetch(
    `${base_url}/assignFb?adminId=${adminId}`,
    requestOptions
  );
  // let response = data.json();
  return data;
}
// -------------------update fresher and experience api starts----------------------------------------------

export async function PutUpdateFresherStatus(position, mobileNumber) {
  //   const adminID = localStorage.getItem("adminID");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    jobCategory: position,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherStatus?mn=${mobileNumber}`,
    requestOptions
  );
  const data = await response.json();
  console.log(data);
  console.log("heloo");
  return data;
}

export async function putUpdatefresherSalarayDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    expectedSalary: obj.expectedSalary,
    expectedSalaryIs: obj.expectedSalaryIs,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherSalaryDetails?mn=${mobilenumber}`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);
  return data;
}

export async function PutUpdatefresherEducationalDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    // qualification: Education,
    // specification: Specialization != "" ? Specialization : "",
    // passed_out_year: CompletedYear != "" ? CompletedYear : "",
    // isHavingArrear: EducationArrear != "" ? EducationArrear : "",
    qualification: obj.qualification,
    specification: obj.specification,
    passed_out_year: obj.passed_out_year,
    isHavingArrear: obj.isHavingArrear,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherEducationDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateFrehserExpertise(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // const raw = JSON.stringify({
  //   keySkill: obj.keySkill.map((option) => option.label).join(","),
  //   courses:
  //     obj.courses !== ""
  //       ? obj.courses.map((option) => option.label).join(",")
  //       : null,
  // });

  const raw = JSON.stringify({
    keySkill: Array.isArray(obj.keySkill)
      ? obj.keySkill.map((option) => option.label).join(",")
      : null,
    courses:
      Array.isArray(obj.courses) && obj.courses.length > 0
        ? obj.courses.map((option) => option.label).join(",")
        : null,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherExpertiseDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateFresherJobLocation(prefLocation, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    prefLocation: prefLocation.map((option) => option.label).join(","),
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherJobLocation?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateFresherBasicDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: obj.name,
    lastName: obj.lastName,
    dateOfBirth: obj.dateOfBirth,
    whatsappNumber: obj.whatsappNumber,
    city: obj.city,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherBasicDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateFresherEmergencyDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    emergencyContactNumber: obj.emergencyContactNumber,
    relationName: obj.relationName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherEmergencyDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}
export async function PutUpdateFresherOtherDetails(
  RotationalShift,
  Accomodation,
  CvResume,
  Refference,
  // tentativeInterviewDate,
  // followUpDate1,
  notes,
  mobilenumber
) {
  // let formattedFollowUpDate1 = "";
  // if (followUpDate1 !== "Invalid date") {
  //   formattedFollowUpDate1 = dateFormate(followUpDate1);
  // }
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const referenceLabel = Refference.label;
  const adminID = localStorage.getItem("adminID");
  const raw = JSON.stringify({
    readyForShifts: RotationalShift,
    needAccommodation: Accomodation,
    reference: Refference,
    havingUpdatedCv: CvResume,
    // tentativeInterviewDate:
    //   dateFormate(tentativeInterviewDate) == "Invalid date"
    //     ? ""
    //     : dateFormate(tentativeInterviewDate),
    // followUpDate1:
    //   dateFormate(followUpDate1) == "Invalid date"
    //     ? ""
    //     : dateFormate(followUpDate1),
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateFresherOtherDetails?mn=${mobilenumber}&adminId=${adminID}&${
      notes !== "" ? "notes=" + notes : null
    }`,
    requestOptions
  );
  const data = await response.json();

  //
  return data;
}

export async function PutUpdateExperienceStatus(
  mobilenumber,
  currentlyWorking
) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  const response = await fetch(
    `${base_url}/updateExperienceStatus?mn=${mobilenumber}&currentlyWorking=${currentlyWorking}`,
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function PutUpdateExperiencecurrentStatus(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // const ReasonForJobchangeLabel = ReasonForJobchange.label;

  const raw = JSON.stringify({
    reason_for_jobchange:
      obj.reason_for_jobchange !== "" ? obj.reason_for_jobchange.label : null,
    reason_for_unemployment:
      obj.reason_for_unemployment !== ""
        ? obj.reason_for_unemployment.label
        : null,
    jobCategory: obj.jobCategory,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceCurrentStatus?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateExperiencedetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    industry: obj.industry.label,
    expMonths: obj.expMonths,
    expYears: obj.expYears,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateExperienceWorkDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    companyName: obj.companyName,
    companyLocation: obj.companyLocation,
    jobTypeMode: obj.jobTypeMode,
    jobRole: obj.jobRole,
    jobWorkHours: obj.jobWorkHours,
    noticePeriod: obj.noticePeriod,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceCurrentWorkDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateExperienceSalaryDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    takeHomeSalary: obj.takeHomeSalary,
    salaryProofDocumentType: obj.salaryProofDocumentType,
    expectedSalary: obj.expectedSalary,
    expectedSalaryIs: obj.expectedSalaryIs,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceSalaryDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateEducationalDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    qualification: obj.qualification,
    specification: obj.specification,
    passed_out_year: obj.passed_out_year,
    isHavingArrear: obj.isHavingArrear,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceEducationDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateExperienceExpertiseDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    keySkill: obj.keySkill.map((option) => option.label).join(","),
    courses:
      obj.courses !== ""
        ? obj.courses.map((option) => option.label).join(",")
        : null,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceExpertiseDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateexperienceJobLocationDetails(
  prefLocation,
  PfEsiAccountRadio,
  mobilenumber
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    prefLocation: prefLocation.map((option) => option.label).join(","),
    pfEsiAccount: PfEsiAccountRadio,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceJobLocationDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateexperienceBasicDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: obj.name,
    lastName: obj.lastName,
    mobileNumber: obj.mobileNumber,
    whatsappNumber: obj.whatsappNumber,
    dateOfBirth: obj.dateOfBirth,
    city: obj.city,
  });
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceBasicDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateexperienceEmergencyDetails(obj, mobilenumber) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    emergencyContactNumber: obj.emergencyContactNumber,
    relationName: obj.relationName,
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceEmergencyDetails?mn=${mobilenumber}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

export async function PutUpdateexperienceOtherDetails(
  RotationalShift,
  Accomodation,
  CvResume,
  Refference,
  // tentativeInterviewDate,
  // followUpDate1,
  notes,
  mobilenumber
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const referenceLabel = Refference.label;
  const adminID = localStorage.getItem("adminID");
  const raw = JSON.stringify({
    readyForShifts: RotationalShift,
    needAccommodation: Accomodation,
    reference: referenceLabel,
    notes: notes !== "" ? notes : null,
    havingUpdatedCv: CvResume,
    // tentativeInterviewDate:
    //   dateFormate(tentativeInterviewDate) == "Invalid date"
    //     ? ""
    //     : dateFormate(tentativeInterviewDate),
    // followUpDate1:
    //   dateFormate(followUpDate1) == "Invalid date"
    //     ? ""
    //     : dateFormate(followUpDate1),
  });

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    `${base_url}/updateExperienceOtherDetails?mn=${mobilenumber}&adminId=${adminID}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}

// -------------------update fresher and experience api end----------------------------------------------

export async function GetCompanyName() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  let response = await fetch(`${base_url}/companyDetails`, requestOptions);
  let data = await response.json();
  return data.companyNames;
}

export async function GetNotAttendEvent() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let response = await fetch(
    `${base_url}/candidateNotAttendEvents`,
    requestOptions
  );
  let data = await response.json();
  return data;
}

export async function PostSla(obj, fileInput) {
  let adminID = localStorage.getItem("adminID");
  const formdata = new FormData();
  formdata.append("pdf", fileInput);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const ccMailParam =
    obj.ccEmailId &&
    typeof obj.ccEmailId === "string" &&
    obj.ccEmailId.trim() !== ""
      ? `ccMail=${obj.ccEmailId.split(",").join(",")}&`
      : "";
  let response = await fetch(
    `${base_url}/sendSLA?id=${obj.empLeadId}&recruitmentFeeType=${obj.paymentType}&recruitmentFeePercentage=${obj.recruitmentFeePercentage}&paymentDuration=${obj.paymentTerms}&replacementDuration=${obj.paymentDuration}&adminId=${obj.fromAdminId}&${ccMailParam}To=${obj.toEmail}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}
const formattedDateTime = getCurrentDateTime();
export async function PutFollowup1LeadLost(mobileNumber) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/followup1LeadLost?leadLost=true&mn=${mobileNumber}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}
export async function PutFollowup2LeadLost(mobileNumber) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/followup2LeadLost?leadLost=true&mn=${mobileNumber}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}
export async function PutinterviewLeadLost(mobileNumber) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/interviewAttendingLeadLost?leadLost=true&mn=${mobileNumber}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}
export async function PutAttenededLeadLost(mobileNumber) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/interviewAttendedLeadLost?leadLost=true&mn=${mobileNumber}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}

export async function Putjoinedfollowup1LeadLost(id) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/followup1JoiningLeadLost?leadLost=true&id=${id}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}


export async function Putjoinedfollowup2LeadLost(id) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/followup2JoiningLeadLost?leadLost=true&id=${id}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}

export async function PutjoinedDayLeadLost(id) {
  const requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  let adminID = localStorage.getItem("adminID");
  let response = await fetch(
    `${base_url}/JoiningDayLeadLost?leadLost=true&id=${id}&date=${formattedDateTime}&adminId=${adminID}`,
    requestOptions
  );
  let data = await response.json();
  return data;
}