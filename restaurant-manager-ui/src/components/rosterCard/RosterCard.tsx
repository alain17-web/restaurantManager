import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import {Employee} from '../../types/types.ts';
import {EmployeeCard} from '../../types/types.ts';
import useCurrentWeekDay from '../../hooks/date/useCurrentWeekDay.tsx';
import axiosInstance from "../../axios/axiosInstance.tsx";

const RosterCard = () => {
    const currentDay = useCurrentWeekDay();
    const [dayShiftStaff, setDayShiftStaff] = useState<EmployeeCard[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);


    const getEmployees = async () => {
        try {
            const res = await axiosInstance.get('/employees/')
            setEmployees(res.data)
            if (employees.length > 0) {
                getStaff()
            }
        } catch (error) {
            console.error('Error getting employees', error)
        }
    }



    useEffect(() => {
        getEmployees()
        if (employees.length > 0) {
            getStaff();
        }
    }, [currentDay]);


    const getStaff = () => {
        const mondaysStaff: EmployeeCard[] = [];
        const weekendStaff: EmployeeCard[] = [];

        employees.forEach((employee: Employee) => {
                if (employee.roster_id) {
                    const employeeData: EmployeeCard = {
                        username: employee.username,
                        roster: employee.roster_id === 1 ? "lundi à vendredi" : "samedi à dimanche",
                        avatar:
                            employee.role_id === 2 && employee.gender === "F" ? "./img/waitress.jpeg" :
                                employee.role_id === 2 && employee.gender === "M" ? "./img/waiter.jpg" :
                                    employee.role_id === 9 && employee.gender === "F" ? "./img/cheffe.jpg" : "./img/chef.jpg.avif"
                    };

                    if (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].includes(currentDay)) {
                        if (employee.roster_id === 1) {
                            if (employee.role_id === 2 || employee.role_id === 9) {
                                mondaysStaff.push(employeeData);
                            }
                        }
                    } else if (['samedi', 'dimanche'].includes(currentDay)) {
                        if (employee.roster_id === 2) {
                            if (employee.role_id === 2 || employee.role_id === 9) {
                                weekendStaff.push(employeeData);
                            }
                        }
                    }

                }
            }
        );

        setDayShiftStaff(
            ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].includes(currentDay)
                ? mondaysStaff
                : weekendStaff
        );
        console.log(mondaysStaff)
    };

    console.log(employees)
    return (
        <div className="w-full h-auto flex items-center justify-around gap-5 bg-amber-100">
            {dayShiftStaff.map((staff) => (
                <Card key={staff.username} sx={{maxWidth: 345, margin: '10px'}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={staff.avatar}
                            alt={staff.username}
                            style={{width: '180px', height: '220px'}}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {staff.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {staff.roster}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
};

export default RosterCard;
