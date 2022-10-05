import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";

Auth.configure(awsConfig); // This is already being done in Index

export default Auth;
