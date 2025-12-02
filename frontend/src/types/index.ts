export interface Analysis {
  wordCount: number;
  weakSections: string[];
}

export interface Resume {
  fileUrl: string;
  uploadedAt: string;
  analysis: Analysis;
}
