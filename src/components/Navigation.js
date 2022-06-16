import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ic_job_scheduler from '@assets/icons/ic_job_scheduler.svg';
import ic_job_scheduler_active from '@assets/icons/ic_job_scheduler_active.svg';
import ic_timesheet from '@assets/icons/ic_timesheet.svg';
import ic_timesheet_active from '@assets/icons/ic_timesheet_active.svg';
import ic_message_center from '@assets/icons/ic_message_center.svg';
import ic_message_center_active from '@assets/icons/ic_message_center_active.svg';
import ic_confict from '@assets/icons/ic_confict.svg';
import ic_confict_active from '@assets/icons/ic_confict_active.svg';
import ic_organizations from '@assets/icons/ic_organizations.svg';
import ic_organizations_active from '@assets/icons/ic_organizations_active.svg';
import ic_users from '@assets/icons/ic_users.svg';
import ic_users_active from '@assets/icons/ic_users_active.svg';
import ic_groups from '@assets/icons/ic_groups.svg';
import ic_groups_active from '@assets/icons/ic_groups_active.svg';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { JOB_SCHEDULER, TIMESHEET, MESSAGE_CENTER, CONFLICS, ORGANIZATIONS, USERS, GROPUS } from "navigation/CONSTANTS";
import packageInfo from '../../package.json';
const Nav = styled.nav`
    width: 60px;
    padding: 1em;
    background: #FFFFFF;
    box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.02);
    @media (max-width: 700px) {
        padding-top: 64px;
    }
    @media (min-width: 700px) {
        position: fixed;
        width: 60px;
        height: calc(100% - 64px);
    }
`;

const NavList = styled.ul`
    margin: 0;
    margin-left:-10px;
    padding: 0;
    list-style: none;
    line-height: 2;
    a {
        text-decoration: none;
        font-weight: bold;
        font-size: 1em;
        color: #333;
    }
    a:visited {
        color: #333;
    }
    a:hover,
    a:focus {
        color: #0077cc;
    }
`;

const IconWrapper = styled.img`
    cursor:pointer;
`;

const Navigation = () => {
    const location = useLocation();
    const { t } = useTranslation();
    let history = useHistory();
    const currentLocactionMainPath = location.pathname.split('/')[1];
    const [selectedPage, setSelectedPage] = React.useState(`${currentLocactionMainPath === '' ? JOB_SCHEDULER : `/${currentLocactionMainPath}`}`);

    let goTo = (route) => {

        setSelectedPage(`/${route.split('/')[1]}`);
        history.push(route);
    };

    return (
        <>
            <Nav>
                <NavList>
                    <li >
                        <Tooltip title={t("Job Scheduler")} placement="right">
                            <IconButton aria-label="Job Scheduler" onClick={() => goTo(JOB_SCHEDULER.replace(':type', 'calendar'))}>
                                <IconWrapper src={!JOB_SCHEDULER.includes(selectedPage) ? ic_job_scheduler : ic_job_scheduler_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li >
                        <Tooltip title={t("TimeSheet")} placement="right">
                            <IconButton aria-label="TimeSheet" onClick={() => goTo(TIMESHEET)}>
                                <IconWrapper src={!TIMESHEET.includes(selectedPage) ? ic_timesheet : ic_timesheet_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li >
                        <Tooltip title={t("Message Center")} placement="right">
                            <IconButton aria-label="Message Center" onClick={() => goTo(MESSAGE_CENTER)}>
                                <IconWrapper src={!MESSAGE_CENTER.includes(selectedPage) ? ic_message_center : ic_message_center_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li >
                        <Tooltip title={t("Conflic manager")} placement="right">
                            <IconButton aria-label="Conflic manager" onClick={() => goTo(CONFLICS)}>
                                <IconWrapper src={!CONFLICS.includes(selectedPage) ? ic_confict : ic_confict_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                </NavList>

                <NavList style={{ position: "absolute", bottom: 10 }}>
                    <li >
                        <Tooltip title={t("Organizations")} placement="right">
                            <IconButton aria-label="Organizations" onClick={() => goTo(ORGANIZATIONS)}>
                                <IconWrapper src={!ORGANIZATIONS.includes(selectedPage) ? ic_organizations : ic_organizations_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li >
                        <Tooltip title={t("Users")} placement="right">
                            <IconButton aria-label="Users" onClick={() => goTo(USERS.replace(':type', 'employees'))}>
                                <IconWrapper src={!USERS.includes(selectedPage) ? ic_users : ic_users_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li >
                        <Tooltip title={t("Groups")} placement="right">
                            <IconButton aria-label="Groups" onClick={() => goTo(GROPUS.replace(':type', 'group'))}>
                                <IconWrapper src={!GROPUS.includes(selectedPage) ? ic_groups : ic_groups_active} alt="Cap logo" />
                            </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <label style={{ display: 'flex', justifyContent: 'center', fontSize: '6px' }}>{`v. ${packageInfo.version}`}</label>
                    </li>
                </NavList>
            </Nav>
        </>
    );
};
export default Navigation;