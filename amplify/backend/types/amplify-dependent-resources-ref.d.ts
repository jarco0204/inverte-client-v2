export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "inverteclientv2": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "function": {
        "inverteAPIV2LoadEssentialInfo": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "api": {
        "inverteAPIV2": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}