import { Button } from '@mui/material';

const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Button variant="text" size="small">
        Text
      </Button>
      <Button
        variant="contained"
        size="small"
        sx={{ backgroundColor: '#1a1a1a', textTransform: 'none' }}
      >
        Contained
      </Button>
      <Button
        variant="contained"
        size="small"
        // sx={{
        //   backgroundColor: colors.blue[500],
        //   color: colors.slate[50],
        //   textTransform: 'none',
        // }}
        className="bg-primary text-slate-50"
      >
        Tailwind Colors
      </Button>
    </div>
  );
};

export default Home;
