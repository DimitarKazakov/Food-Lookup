import { Box } from '@mui/material';
import { Navigation } from './Navigation';

type LayoutProps = {
  children: JSX.Element;
};
export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <Box className="bg-slate-300 h-screen">
      <Navigation />

      <Box className="bg-slate-300 h-100">{children}</Box>
    </Box>
  );
};
