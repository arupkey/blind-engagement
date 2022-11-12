import React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@material-ui/core/Link';

export function Resources(){
  
  //can add fake scholarships to list later or maybe real
  const resourceNames = ['NJ Commission for the Blind and Visually Impaired','Family Resource Network','JKTC', 'NFB','ACB','AFB','AccessLink'];
  const resourceLinks = ['https://www.state.nj.us/humanservices/cbvi/','https://www.familyresourcenetwork.org/','https://www.state.nj.us/humanservices/cbvi/services/jkrc/', 'https://nfb.org/','https://www.acb.org/','https://www.afb.org/','https://accesslink.njtransit.com/'];

  const resourceCards = resourceNames.map((resource, index) =>{
    const resourceLink = resourceLinks[index];
    return(
      <li style={{paddingBottom: '10px'}} >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography aria-describedby={resource} variant="h5" component="div"> {resource} </Typography>
            <Link target="_blank" href={resourceLink} rel="noreferrer">{resourceLink}</Link>
          </CardContent>
        </Card>
      </li>
    )
  })

  return (
    <div className="container">

      <h3>EDGE Resources Below</h3>

      <ul>
        {resourceCards}
      </ul>

    </div>
  );
}
