import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_URL = "http://192.168.174.162:8080/api";
//192.168.174.162:8081
const API_URL = "http://192.168.174.67:8080/api";

export const getAllTickets = createAsyncThunk("subtype/typelist", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${API_URL}/subtype/typelist`,

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-APIKEY": "c2bd9b2c-66b4-4923-9d07-60cad928dcf2",
          AgentName: "VASY_HRMS",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.responseData);
  }
});

export const createTickets = createAsyncThunk(
  "ticket/create",
  async (
    { ticketId, title, description, type, subType, priority, reportingManager, createdBy, status },
    { dispatch, rejectWithValue }
  ) => {
    debugger;
    try {
      const response = await axios.post(
        `${API_URL}/ticket/create`,
        {
          ticketId: ticketId,
          title: title,
          description: description,
          type: type,
          subType: subType,
          priority: priority,
          reportingManager: reportingManager,
          status: status,
          createdBy: createdBy,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-APIKEY": "c2bd9b2c-66b4-4923-9d07-60cad928dcf2",
            AgentName: "VASY_HRMS",
          },
        }
      );
      debugger;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.responseData);
    }
  }
);

export const DeleteTicketsById = createAsyncThunk("/subtype/delete", async (id, { dispatch, rejectWithValue }) => {
  try {
    if (id) {
      const response = await axios.delete(`${API_URL}/subtype/delete/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-APIKEY": "c2bd9b2c-66b4-4923-9d07-60cad928dcf2",
          AgentName: "VASY_HRMS",
        },
      });
      dispatch(getAllTickets());
      return response.data;
    }
  } catch (error) {
    rejectWithValue(error.response.responseData);
  }
});

const initialState = {
  ticketList: [],
  ticketData: [],
  ticketUpdata: [],
  loading: false,
  error: undefined,
};

const ticketRequestSlice = createSlice({
  name: "ticketRequest",
  initialState,
  reducers: {
    ticketData: (state, action) => {
      return { ...state, ticketData: action.payload };
    },
    ticketUpdata: (state, action) => {
      return { ...state, ticketUpdata: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllTickets.fulfilled, (state, action) => {
        if (action.payload.status) {
          return { ...state, loading: false, ticketList: action.payload };
        } else {
          return { ...state, loading: false, ticketList: initialState.ticketList };
        }
      })
      .addCase(getAllTickets.pending, (state) => {
        return { ...state, loading: true };
      })

      .addCase(createTickets.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          return { ...state, loading: false, ticketData: action.payload };
        } else {
          return { ...state, loading: false, ticketData: initialState.ticketData };
        }
      })
      .addCase(createTickets.pending, (state) => {
        return { ...state, loading: true };
      })

      // .addCase(updateTickets.fulfilled, (state, action) => {
      //   if (action.payload.status == true) {
      //     return { ...state, loading: false, ticketUpdata: action.payload };
      //   } else {
      //     return { ...state, loading: false, ticketUpdata: initialState.ticketUpdata };
      //   }
      // })
      // .addCase(updateTickets.pending, (state) => {
      //   return { ...state, loading: true };
      // })

      .addCase(DeleteTicketsById.fulfilled, (state, action) => {
        if (action.payload.status) {
          return { ...state, loading: false };
        } else {
          return { ...state, loading: false, specificTicketId: initialState.ticketList };
        }
      })
      .addCase(DeleteTicketsById.pending, (state) => {
        return { ...state, loading: true };
      });
  },
});
export const ticketRequestReducer = ticketRequestSlice.reducer;
export const ticketRequestSelector = (state) => state.ticketRequest;
export const { ticketTypeData, ticketUpdata } = ticketRequestSlice.actions;
