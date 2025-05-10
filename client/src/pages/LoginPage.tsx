import { Helmet } from "react-helmet";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | TalentMatch.ai</title>
        <meta
          name="description"
          content="Login to TalentMatch.ai to visualize your company's talent pool and recruitment hotspots."
        />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginPage;
