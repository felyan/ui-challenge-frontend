import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <section>
      <Typography variant="h1">Unauthorized</Typography>
      <br />
      <Typography variant="body1">You do not have access to the requested page.</Typography>
      <div className="flexGrow">
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </section>
  )
}

export default Unauthorized