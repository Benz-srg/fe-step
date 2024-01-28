export interface IFormProject {
  user_id?: string;
  head_of_project?: string;
  department?: string;
  faculty?: string;
  phone?: string;
  office_phone?: string;
  email?: string;
  name_th?: string;
  name_en?: string;
  differences_from_jobs?: string;
  files_attachments_detail?: string;
  is_research_document?: boolean;
  is_contract_document?: boolean;
  is_permission_document?: boolean;
  is_other_document?: boolean;
  publication_infomation?: Publication;
  show_invention?: ShowInvention;
  award_information?: AwardInformation;
  funding_information?: FundingInformation;
  user_assistant?: UserAssistant;
  files: IFormFile;
}

export interface IFormFile {
  research_document?: any;
  permission_document?: any;
  contract_document?: any;
  other_document?: any;
}

export interface IProject {
  id: number;
  user_id: string;
  head_of_project: string;
  department: string;
  faculty: string;
  phone: string;
  office_phone: string;
  email: string;
  state: number;
  name_th: string;
  name_en: string;
  is_research_document: boolean;
  is_contract_document: boolean;
  is_permission_document: boolean;
  is_other_document: boolean;
  research_document: any;
  contract_document: any;
  permission_document: any;
  other_document: any;
  research_document_size: any;
  contract_document_size: any;
  permission_document_size: any;
  other_document_size: any;
  user_assistant_id: number;
  differences_from_jobs?: string;
  files_attachments_detail?: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_assistant: UserAssistant;
  file_attachments: any[];
  file_publics_documents: any[];
  publication: Publication;
  show_invention: ShowInvention;
  award_information: AwardInformation;
  funding_information: FundingInformation;
}

export interface UserAssistant {
  id?: number;
  full_name: string;
  email: string;
  phone: string;
}

export interface Publication {
  id?: number;
  project_id?: number;
  never_published: boolean;
  ever_published: boolean;
  date_published: string;
}

export interface ShowInvention {
  id?: number;
  project_id?: number;
  is_show: boolean;
  title: string;
  show_event_title: string;
  show_date: string;
}

export interface AwardInformation {
  id?: number;
  project_id?: number;
  is_received: boolean;
  title: string;
  department: string;
  reveived_date: string;
}

export interface FundingInformation {
  id?: number;
  project_id?: number;
  not_received: boolean;
  received: boolean;
  received_from: string;
  according_no: string;
  according_file?: any;
  according_file_size?: any;
  results: string;
}
