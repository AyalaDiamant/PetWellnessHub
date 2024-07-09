import React, { useContext, useEffect, useState } from 'react';
import { getMeetings } from '../api/meet.api';
import { Meeting as Meet } from '../interfaces/meeting.interface';
import { CurrentContextUser } from '../context/user.context';
import {
    Typography,
    List,
    ListItem,
    Box,
    Stack,
    Paper,
    Container,
} from '@mui/material';
import logo from '../assets/LOGO.png';

export const Meeting = () => {
    const [meeting, setMeeting] = useState<Meet[]>([]);
    const currentUserContext = useContext(CurrentContextUser);
    const { currentUser } = currentUserContext;

    const userId = currentUser._id || localStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            if (userId != null) {
                try {
                    const data = await getMeetings(userId);
                    setMeeting(data);
                } catch (error) {
                    console.error('Error fetching services:', error);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Container maxWidth="md">
                <img src={logo} alt="Description of Image 1" style={{ width: '50%', display: 'block', margin: '0 auto' }} />
                <Box mt={4} textAlign="center">
                    <Typography variant="h3" gutterBottom>Your Meetings</Typography>
                </Box>

                {meeting.length ? (
                    <List style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {meeting.map((meet) => (
                            <ListItem key={meet._id} style={{ width: '100%' }}>
                                <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Stack>
                                            <Typography variant="h6" color="primary">
                                                {meet.time}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Date: </strong>{meet.date}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Place: </strong>{meet.place}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Common: </strong>{meet.common}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box mt={4} textAlign="center">
                        <Typography variant="h5">You don't have any meetings yet.</Typography>
                    </Box>
                )}
            </Container>
        </div>
    );
};

export default Meeting;
