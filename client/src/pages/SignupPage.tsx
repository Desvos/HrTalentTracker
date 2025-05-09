import { Helmet } from 'react-helmet';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up | HR Talent Mapper</title>
        <meta name="description" content="Create an account with HR Talent Mapper to visualize and analyze your talent pool and recruitment hotspots." />
      </Helmet>
      <SignupForm />
    </>
  );
};

export default SignupPage;
