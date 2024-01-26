"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Employee } from "@/lib/services/employeeTypes";
import { getGenderKeyByValue } from "@/utils/helper";
import { Box, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EmployeeCardProps {
  employeeItem: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const EmployeeCard = ({ employeeItem ,onEdit,onDelete }: EmployeeCardProps) => {
  return (
    <Card className="max-w-md">
      <CardMedia component="img" alt="Person Photo" height="30" className="max-w-sm max-h-96" image={employeeItem.photo} />
      <CardContent>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="text.primary">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body2" color="text.secondary">
                {employeeItem.email}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="text.primary">
                Mobile:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body2" color="text.secondary">
                {employeeItem.number}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="text.primary">
                Gender:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body2" color="text.secondary">
                {getGenderKeyByValue(employeeItem.gender)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions className="flex justify-end">
        <IconButton aria-label="edit"  color="primary" onClick={()=> onEdit(employeeItem)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete"  color="warning" onClick={()=> onDelete(employeeItem)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
