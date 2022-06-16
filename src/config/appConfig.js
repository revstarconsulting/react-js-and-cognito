const local = {
    s3: {
        BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
    },
    api: {
        ENDPOINT: "http://localhost:3000/local",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_u5b3YSQVa",
        APP_CLIENT_ID: "4gc5ct864u462htjm4oj396q05",
        IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
    }
};

const dev = {
    s3: {
        BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
    },
    api: {
        ENDPOINT: "https://dev.api.wecarestaffservices.com",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_u5b3YSQVa",
        APP_CLIENT_ID: "4gc5ct864u462htjm4oj396q05",
        IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
    }
};

const stage = {
    s3: {
        BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
    },
    api: {
        ENDPOINT: "https://test.api.wecarestaffservices.com",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_LHO3JgsZE",
        APP_CLIENT_ID: "6fa07kvtctfmd3ehtcmb57tdc4",
        IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
    }
};

const prod = {
    s3: {
        BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
    },
    api: {
        ENDPOINT: "https://api.wecarestaffservices.com",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_Re9eVvEFv",
        APP_CLIENT_ID: "7rnfucfik7n2uljroj8svu2fe3",
        IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
    }
};

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : process.env.REACT_APP_STAGE === 'stage' ? stage :
        process.env.REACT_APP_STAGE === 'dev' ? dev :
            local;

const sharedObj = { // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
}
export default sharedObj;