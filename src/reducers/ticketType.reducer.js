import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_URL = "http://192.168.174.162:8080/api";
const API_URL = "http://192.168.174.67:8081/api";

export const getAllTicketType = createAsyncThunk("subtype/typelist", async (_, { rejectWithValue }) => {
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

export const createTicketType = createAsyncThunk(
  "subtype/create",
  async ({ subTypeId, type, subType, uId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/subtype/create`,
        {
          subTypeId: subTypeId,
          type: type,
          subType: subType,
          uId: uId,
        },

        {
          headers: {
            Accept: "*/*",
            "X-APIKEY": "c2bd9b2c-66b4-4923-9d07-60cad928dcf2",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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

export const fetchTicketTypes = createAsyncThunk(
  "subtype/list",
  async ({ searchValue, length, start, draw }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/subtype/list`,
        {
          searchValue: searchValue,
          length: length,
          start: start,
          draw: draw,
        },
        {
          headers: {
            Accept: "*/*",
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
  }
);

export const DeleteTicketTypeById = createAsyncThunk("/subtype/delete", async (id, { dispatch, rejectWithValue }) => {
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
      dispatch(getAllTicketType());
      return response.data;
    }
  } catch (error) {
    rejectWithValue(error.response.responseData);
  }
});

const initialState = {
  ticketTypeList: [],
  ticketTypeData: [],
  fetchList: [],

  loading: false,
  error: undefined,
};

const ticketTypeSlice = createSlice({
  name: "ticketType",
  initialState,
  reducers: {
    ticketTypeData: (state, action) => {
      return { ...state, ticketTypeData: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllTicketType.fulfilled, (state, action) => {
        if (action.payload) {
          return { ...state, loading: false, ticketTypeList: action.payload };
        } else {
          return { ...state, loading: false, ticketTypeList: initialState.ticketTypeList };
        }
      })
      .addCase(getAllTicketType.pending, (state) => {
        return { ...state, loading: true };
      })

      .addCase(fetchTicketTypes.fulfilled, (state, action) => {
        if (action.payload) {
          return { ...state, loading: false, fetchList: action.payload };
        } else {
          return { ...state, loading: false, fetchList: initialState.fetchList };
        }
      })
      .addCase(fetchTicketTypes.pending, (state) => {
        return { ...state, loading: true };
      })

      .addCase(createTicketType.fulfilled, (state, action) => {
        if (action.payload.status == true) {
          return { ...state, loading: false, ticketTypeData: action.payload };
        } else {
          return { ...state, loading: false, ticketTypeData: initialState.ticketTypeData };
        }
      })
      .addCase(createTicketType.pending, (state) => {
        return { ...state, loading: true };
      })

      .addCase(DeleteTicketTypeById.fulfilled, (state, action) => {
        if (action.payload.status) {
          return { ...state, loading: false };
        } else {
          return { ...state, loading: false, specificTicketTypeId: initialState.ticketTypeList };
        }
      })
      .addCase(DeleteTicketTypeById.pending, (state) => {
        return { ...state, loading: true };
      });
  },
});
export const ticketTypeReducer = ticketTypeSlice.reducer;
export const ticketTypeSelector = (state) => state.ticketType;
export const { ticketTypeData } = ticketTypeSlice.actions;
