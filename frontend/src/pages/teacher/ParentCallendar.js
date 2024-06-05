import React, { useState, useRef } from "react";
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

import CustomModal from "./components/CustomModal";
import events from "./events";
import "./custom.css";
// import "./styles.css";


const ParentCallendar = () => {
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
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,today,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                buttonText={{
                  today: "Aujourd'hui",
                  month: "moins",
                  week: "semaine",
                  day: "jour",
                  list: "list"
                }}
                locale={'fr'}

                initialView="timeGridWeek"
                editable={false}
                selectable={false}
                selectMirror={false}
                dayMaxEvents={false}
                weekends={weekendsVisible}
                initialEvents={[
                  {
                    id: nanoid(),
                    title: "MATH",
                    start: "2024-05-18 13:00:01",
                    end: "2024-05-18 15:00:01",
                    backgroundColor: "#86C8BC",
                    borderColor: "#86C8BC"

                  },
                  {
                    id: nanoid(),
                    title: "PHYSIQUE ",
                    start: "2024-05-18 09:00:01",
                    end: "2024-05-18 11:00:01",
                    backgroundColor: "#71e08b",
                    borderColor: "#71e08b"
                  }, {
                    id: nanoid(),
                    title: "CCI",
                    start: "2024-05-18 16:00:01",
                    end: "2024-05-18 17:00:01",
                    backgroundColor: "#71e08b",
                    borderColor: "#71e08b"
                  },
                  {
                    id: nanoid(),
                    title: "ECII",
                    start: "2024-05-18 21:00:01",
                    end: "2024-05-18 22:00:01",
                    backgroundColor: "#86C8BC",
                    borderColor: "#86C8BC"
                  },
                  {
                    id: nanoid(),
                    title: "MATH",
                    start: "2024-05-16 13:00:01",
                    end: "2024-05-16 15:00:01",
                    backgroundColor: "#71e08b",
                    borderColor: "#71e08b"
                  },
                  {
                    id: nanoid(),
                    title: "PHYSIQUE ",
                    start: "2024-05-16 09:00:01",
                    end: "2024-05-16 11:00:01",
                  }, {
                    id: nanoid(),
                    title: "CCI",
                    start: "2024-05-16 16:00:01",
                    end: "2024-05-16 17:00:01",

                  },
                  {
                    id: nanoid(),
                    title: "ECII",
                    start: "2024-05-16 21:00:01",
                    end: "2024-05-16 22:00:01",
                  },
                  {
                    id: nanoid(),
                    title: "MATH",
                    start: "2024-06-04 13:00:01",
                    end: "2024-06-04 15:00:01",

                  },
                  {
                    id: nanoid(),
                    title: "PHYSIQUE ",
                    start: "2024-06-04 09:00:01",
                    end: "2024-06-04 11:00:01",
                  }, {
                    id: nanoid(),
                    title: "CCI",
                    start: "2024-06-04 16:00:01",
                    end: "2024-06-04 17:00:01",

                  },
                  {
                    id: nanoid(),
                    title: "ECII",
                    start: "2024-06-04 21:00:01",
                    end: "2024-06-04 22:00:01",
                  },
                ]}
                // select={handleDateSelect}
                // eventContent={renderEventContent}
                eventClick={() => { navigate('/Teacher/class') }}
              // editable={TRUE}
              // selectable={TRUE}
              // selectMirror={TRUE}
              // dayMaxEvents={TRUE}
              // eventsSet={() => handleEvents(events)}
              // eventDrop={handleEventDrop}
              // eventResize={handleEventResize}
              // dateClick={(handleDateClick)}
              // eventAdd={(e) => {
              //   console.log("eventAdd", e);
              // }}
              // eventChange={(e) => {
              //   console.log("eventChange", e);
              // }}
              // eventRemove={(e) => {
              //   console.log("eventRemove", e);
              // }}
              />
            </Grid>
          </Grid>
        </Container>
      </Card>
      <CustomModal
        title={state.state === "update" ? "modifier" : "Ajouter"}
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={subjectName}
          label="Choose an option"
        // onChange={changeHandler}  
        ></Select>
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
export default ParentCallendar




