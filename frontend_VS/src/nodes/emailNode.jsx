import { useEffect, useState } from "react";

export const RenderEmailNode = ({ id, data, updateNodeData }) => {
  const [inputData, setInputData] = useState({
    email: data?.email ?? "",
    subject: data?.subject ?? "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputData.email !== data?.email) {
        updateNodeData(id, "email", inputData.email);
      }
      if (inputData.subject !== data?.subject) {
        updateNodeData(id, "subject", inputData.subject);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [updateNodeData, inputData, id, data?.email, data?.subject]);

  const onInputChange = (field, value) => {
    setInputData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <>
      <label>
        To
        <input
          value={inputData.email}
          onChange={(event) => {
            onInputChange("email", event.target.value);
          }}
          className="nodrag nowheel"
          type="email"
        />
      </label>
      <label>
        Subject
        <input
          value={inputData.subject}
          onChange={(event) => {
            onInputChange("subject", event.target.value);
          }}
          className="nodrag nowheel"
          type="text"
        />
      </label>
    </>
  );
};
