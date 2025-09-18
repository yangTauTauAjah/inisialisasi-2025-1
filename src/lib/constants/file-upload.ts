// File upload constants shared between frontend and backend
export const FILE_UPLOAD_CONFIG = {
  // File size limit in MB
  MAX_FILE_SIZE_MB: 0.2, // 200KB
  
  // Convert to bytes for validation
  get MAX_FILE_SIZE_BYTES() {
    return this.MAX_FILE_SIZE_MB * 1024 * 1024;
  },
  
  // Get file size limit in KB for display
  get MAX_FILE_SIZE_KB() {
    return this.MAX_FILE_SIZE_MB * 1000;
  },
  
  // Allowed file types (MIME types)
  ALLOWED_FILE_TYPES: [
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    
    // Spreadsheets
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    
    // Presentations
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    
    // Text files
    'text/plain',
    'text/csv',
    
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    
    // Archives
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
  ],
  
  // Get file extension from MIME type
  getFileExtensions(): string[] {
    return [
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.txt', '.csv', '.jpg', '.jpeg', '.png', '.gif', '.webp',
      '.zip', '.rar', '.7z'
    ];
  },
  
  // Format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
} as const;
