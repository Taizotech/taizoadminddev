import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function AdminTemplatePost() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");
  const [language, setLanguage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [channelError, setChannelError] = useState(false);
  const [languageError, setLanguageError] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    if (event.target.value.trim()) setCategoryError(false);
  };

  const handleSubmit = () => {
    // Check for errors
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    if (!selectedCategory.trim()) {
      setCategoryError(true);
      return;
    }
    if (selectedCategory === "email" && !subject.trim()) {
      setSubjectError(true);
      return;
    }
    if (selectedCategory === "email" && !body.trim()) {
      setBodyError(true);
      return;
    }
    if (selectedCategory === "whatsup" && !message.trim()) {
      setMessageError(true);
      return;
    }
    if (!channel.trim()) {
      setChannelError(true);
      return;
    }
    if (!language.trim()) {
      setLanguageError(true);
      return;
    }
    // Handle form submission
    console.log("Form submitted successfully!");
    // Reset errors
    setNameError(false);
    setCategoryError(false);
    setSubjectError(false);
    setBodyError(false);
    setMessageError(false);
    setChannelError(false);
    setLanguageError(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
        <div style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Name</label>
          <div style={{ marginRight: "10px" }}>
            <TextField
              label="Enter name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setNameError(false);
              }}
              error={nameError}
            />
          </div>
        </div>

        <div style={{ marginRight: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Category</label>
            <Select
              disablePortal
              id="category-select"
              sx={{ width: 250 }}
              label="Category"
              variant="outlined"
              value={selectedCategory}
              onChange={handleCategoryChange}
              error={categoryError}
            >
              <MenuItem value="whatsup">Whatsup</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </div>
        </div>

        <div style={{ marginRight: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Channel</label>
            <Select
              disablePortal
              id="channel-select"
              sx={{ width: 250 }}
              label="Channel"
              variant="outlined"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              error={channelError}
            >
              <MenuItem value="channel1">Channel 1</MenuItem>
              <MenuItem value="channel2">Channel 2</MenuItem>
              <MenuItem value="channel3">Channel 3</MenuItem>
            </Select>
          </div>
        </div>

        <div style={{ marginRight: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Language</label>
            <Select
              disablePortal
              id="language-select"
              sx={{ width: 250 }}
              label="Language"
              variant="outlined"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              error={languageError}
            >
              <MenuItem value="language1">Language 1</MenuItem>
              <MenuItem value="language2">Language 2</MenuItem>
              <MenuItem value="language3">Language 3</MenuItem>
            </Select>
          </div>
        </div>
      </div>

      {selectedCategory === "email" && (
        <>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Subject</label>
            <TextField
              label="Enter subject"
              variant="outlined"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (e.target.value.trim()) setSubjectError(false);
              }}
              error={subjectError}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
            <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Body</label>
            <TextField
              label="Enter body"
              variant="outlined"
              multiline
              rows={4}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                if (e.target.value.trim()) setBodyError(false);
              }}
              error={bodyError}
            />
          </div>
        </>
      )}

      {selectedCategory === "whatsup" && (
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
          <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Message</label>
          <TextField
            label="Enter message"
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value.trim()) setMessageError(false);
            }}
            error={messageError}
          />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <button
          style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", borderRadius: "5px" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AdminTemplatePost;
