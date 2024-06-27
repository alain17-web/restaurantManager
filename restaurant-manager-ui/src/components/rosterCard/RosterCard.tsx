import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { employees } from '../../tempData.ts';
import { Employee } from '../../types/types.ts';
import { EmployeeCard } from '../../types/types.ts';
import useCurrentWeekDay from '../../hooks/date/useCurrentWeekDay.tsx';

const RosterCard = () => {
    const currentDay = useCurrentWeekDay();
    const [dayShiftStaff, setDayShiftStaff] = useState<EmployeeCard[]>([]);

    useEffect(() => {
        getStaff();
    }, [currentDay]);

    const getStaff = () => {
        const mondaysStaff: EmployeeCard[] = [];
        const weekendStaff: EmployeeCard[] = [];

        employees.forEach((employee: Employee) => {
            if (employee.roster) {
                const employeeData: EmployeeCard = {
                    username: employee.username,
                    role: employee.role,
                    avatar: employee.avatar,
                    roster: employee.roster
                };

                if (['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].includes(currentDay)) {
                    if (employee.roster === 'lundi a vendredi') {
                        if (employee.role === 'waiter' || employee.role === 'cook') {
                            mondaysStaff.push(employeeData);
                        }
                    }
                } else if (['samedi', 'dimanche'].includes(currentDay)) {
                    if (employee.roster === 'samedi a dimanche') {
                        if (employee.role === 'waiter' || employee.role === 'cook') {
                            weekendStaff.push(employeeData);
                        }
                    }
                }
            }
        });

        setDayShiftStaff(
            ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'].includes(currentDay)
                ? mondaysStaff
                : weekendStaff
        );
    };

    return (
        <div className="w-full h-auto flex items-center justify-around gap-5 bg-amber-100">
            {dayShiftStaff.map((staff) => (
                <Card key={staff.username} sx={{ maxWidth: 345, margin: '10px' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={staff.avatar}
                            alt={staff.username}
                            style={{ width: '180px', height: '220px' }}
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
