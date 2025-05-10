import { Helmet } from "react-helmet";
import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | TalentMatch.ai</title>
        <meta
          name="description"
          content="Create an account with TalentMatch.ai to visualize and analyze your talent pool and recruitment hotspots."
        />
      </Helmet>
      <SignupForm />
    </>
  );
};

export default SignupPage;
