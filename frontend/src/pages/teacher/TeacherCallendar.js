import React, { useState, useRef, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from 'react-router-dom';
import { nanoid } from "nanoid";
import {
  Container,
  Grid,
  Button,
  TextField,
  Typography,
  MenuItem,
  Card, Select
} from "@mui/material";
// import Select from "react-select";
import DateRangePicker from "react-bootstrap-daterangepicker";
import rrulePlugin from '@fullcalendar/rrule';

import CustomModal from "./components/CustomModal";
import events from "./events";
import "./custom.css";
import { useDispatch, useSelector } from "react-redux";
// import "./styles.css";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

import { getUserDetails, } from '../../redux/userRelated/userHandle';

const TeacherCallendar = () => {
  let todayStr = new Date().toISOString().replace(/T.*$/, "");
  const navigate = useNavigate()

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const calendarRef = useRef(null);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [state, setState] = useState({});
  const [departments, setDepartments] = useState([
    { value: "1", label: "All" },
    { value: "2", label: "BPA Technical" },
    { value: "3", label: "Aqua 2 Cleaning" }
  ]);

  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };

  const handleDateClick = (arg) => {
    // Handle date click
  };

  const handleDateSelect = (selectInfo) => {
    if (selectInfo.view.type === "timeGridWeek" || selectInfo.view.type === "timeGridDay") {
      selectInfo.view.calendar.unselect();
      setState({ selectInfo, state: "create" });
      setStart(selectInfo.start);
      setEnd(selectInfo.end);
      setModal(true);
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <i
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {eventInfo.event.title}
        </i>
      </div>
    );
  };

  const handleEventClick = (clickInfo) => {
    setState({ clickInfo, state: "update" });
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    setEnd(clickInfo.event.end);
    setModal(true);
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const handleEventDrop = (checkInfo) => {
    setState({ checkInfo, state: "drop" });
    setConfirmModal(true);
  };

  const handleEventResize = (checkInfo) => {
    setState({ checkInfo, state: "resize" });
    setConfirmModal(true);
  };

  const handleEdit = () => {
    state.clickInfo.event.setStart(start);
    state.clickInfo.event.setEnd(end);
    state.clickInfo.event.mutate({
      standardProps: { title }
    });
    handleClose();
  };

  const handleSubmit = () => {
    const newEvent = {
      id: nanoid(),
      title,
      start: state.selectInfo?.startStr || start.toISOString(),
      end: state.selectInfo?.endStr || end.toISOString(),
      allDay: state.selectInfo?.allDay || false
    };

    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);
    handleClose();
  };

  const handleDelete = () => {
    state.clickInfo.event.remove();
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setState({});
    setModal(false);
  };

  const onFilter = (element) => {
    console.log(element.value);
  };
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
  const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);
  useEffect(() => {

    dispatch(getSubjectList(currentUser?.teachSclass?._id, "ClassSubjects"));
    console.log('subjectsList, sclassDetails ', subjectsList, sclassDetails)
    if (subjectsList, sclassDetails) {

      const events = transformApiDataToEvents(subjectsList);
      console.log('eventsss', events)
      setEvents(events);
    }
  }, [dispatch, currentUser?.sclassName?._id]);

  useEffect(() => {
    dispatch(getUserDetails(currentUser?._id, "Student"));
    console.log('subjectsList, sclassDetails ', subjectsList, sclassDetails)
    if (subjectsList, sclassDetails) {

      const events = transformApiDataToEvents(subjectsList);
      console.log('events', events)
      setEvents(events);
    }

  }, [dispatch, subjectsList, sclassDetails, currentUser?._id])

  const transformApiDataToEvents = (apiData) => {
    return apiData.map((item) => {
      const startDate = new Date(item.createdAt);

      return {
        id: nanoid(),
        title: item.subName.toUpperCase(),
        start: startDate.toISOString(),
        end: new Date(startDate.getTime() + 3 * 60 * 60 * 1000).toISOString(), // Assuming 2-hour duration
        backgroundColor: "#71e08b",
        borderColor: "#71e08b",
        rrule: {
          freq: 'weekly',
          byweekday: ['sa'],
          dtstart: startDate.toISOString(),
          until: '2024-12-31T23:59:59',
        },
      };
    });
  };
  return (
    <div className="App">
      {/* <Typography variant="h4">Agenda</Typography> */}
      <Card style={{ paddingBlock: 25 }}>
        <Container>
          <Grid container spacing={3} style={{ marginBottom: 20 }}>

            {/* <Grid item sm={3} smOffset={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setModal(true)}
            >
              Add schedule
            </Button>
          </Grid> */}
          </Grid>
          <Grid container>
            <Grid item md={12}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, rrulePlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,today,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                buttonText={{
                  today: "Aujourd'hui",
                  month: "mois",
                  week: "semaine",
                  day: "jour",
                  list: "list"
                }}
                locale={'fr'}

                initialView="timeGridWeek"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                events={events}
                // select={handleDateSelect}
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventClick={() => { navigate('/Teacher/class') }}

                eventsSet={() => handleEvents(events)}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
                dateClick={(handleDateClick)}
                eventAdd={(e) => {
                  console.log("eventAdd", e);
                }}
                eventChange={(e) => {
                  console.log("eventChange", e);
                }}
                eventRemove={(e) => {
                  console.log("eventRemove", e);
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Card>
      <CustomModal
        title={state.state === "update" ? "modifier l'evenement creé" : "Ajouter un nouveau evenement"}
        isOpen={modal}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={state.clickInfo ? handleEdit : handleSubmit}
        submitText={state.clickInfo ? "Update" : "Enregistrer"}
        onDelete={state.clickInfo && handleDelete}
        deleteText="Delete"
      >
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <DateRangePicker
          initialSettings={{
            locale: {
              format: "M/DD hh:mm A"
            },
            startDate: start,
            endDate: end,
            timePicker: true
          }}
          onApply={(event, picker) => {
            setStart(new Date(picker.startDate));
            setEnd(new Date(picker.endDate));
          }}
        >

          <TextField
            label="From - End"
            fullWidth
            value={`${start.toLocaleString()} - ${end.toLocaleString()}`}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
          />
        </DateRangePicker>
      </CustomModal>

    </div>
  );
}
export default TeacherCallendar




