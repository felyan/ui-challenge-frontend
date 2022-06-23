import { useState, useEffect } from 'react';
import SingleUser from './content/SingleUser';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { List, Typography } from '@mui/material';
// import useRefreshToken from '../hooks/useRefreshToken';

const Users = () => {
    const [users, setUsers] = useState<{username: string}[]>([]);
    // const refresh = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        
        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [axiosPrivate, navigate, location])

    return (
        <>
            <Typography variant="h2">Users list</Typography>
            {users?.length
                ? (
                    <List>
                        {users.map((user) => (
                            <SingleUser
                                key={user.id}
                                user={user}
                            />
                        ))}
                    </List>
                ) : <Typography variant="h3">No users to display</Typography>
            }
            {/* <button onClick={() => refresh()}>Refresh</button> */}
            <br />
        </>
    );
};

export default Users;