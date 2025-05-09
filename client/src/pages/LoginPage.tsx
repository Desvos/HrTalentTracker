import { Helmet } from 'react-helmet';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | HR Talent Mapper</title>
        <meta name="description" content="Login to HR Talent Mapper to visualize your company's talent pool and recruitment hotspots." />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginPage;
