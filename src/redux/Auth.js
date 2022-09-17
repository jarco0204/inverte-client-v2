import { Auth } from "aws-amplify";
import awsConfig from '../aws-exports'

Auth.configure(awsConfig);

export default Auth;