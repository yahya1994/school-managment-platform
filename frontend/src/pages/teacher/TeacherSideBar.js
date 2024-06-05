import * as React from 'react';
import { Collapse, Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser?.teachSclass
    const [IsOpen, setIsOpen] = React.useState(false);

    const location = useLocation();
    return (

        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === ("/" || "/Teacher/dashboard") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Accueil" />
                </ListItemButton>
                <ListItemButton onClick={() => setIsOpen(!IsOpen)}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={IsOpen ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary={`Classes`} />
                    {IsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={IsOpen} timeout="auto" unmountOnExit>
                    <ListItemButton component={Link} to="/Teacher/class">
                        <ListItemButton component={Link} to="/Teacher/class">
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={`Classe ${sclassName?.sclassName}`} />
                        </ListItemButton>
                    </ListItemButton>
                    {/* You can add more list items here */}
                </Collapse>

                <ListItemButton component={Link} to="/Teacher/complain">
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Teacher/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Agenda" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Utilisateur
                </ListSubheader>
                <ListItemButton component={Link} to="/Teacher/profile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Teacher/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profil" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Déconnexion" />
                </ListItemButton>
            </React.Fragment>

        </>


    )
}

export default TeacherSideBar