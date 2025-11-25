export const violationAnalysisRoutes = {
    analyzeImage: {
        method: 'POST',
        path: '/api/ViolationAnalysis/analyze',
        protected: true,
        description: 'Analyze violation image and extract data',
        contentType: 'multipart/form-data',
        responseType: 'ViolationAnalysisResponse'
    },

    processImage: {
        method: 'POST',
        path: '/api/ViolationAnalysis/process',
        protected: true,
        description: 'Process and analyze violation image',
        contentType: 'multipart/form-data'
    }
};
