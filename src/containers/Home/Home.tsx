import { fetchShows, fetchShowInfo } from "../../../store/Shows/showsThunks.ts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectShows, selectShowsLoading, selectShow } from "../../../store/Shows/showsSlice.ts";
import { Autocomplete, TextField } from "@mui/material";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const dispatch = useAppDispatch();
    const shows = useAppSelector(selectShows);
    const loading = useAppSelector(selectShowsLoading);
    const show = useAppSelector(selectShow);
    const [inputValue, setInputValue] = useState<string>("");
    const navigate = useNavigate();

    const onInputHandle = (value: string) => {
        setInputValue(value);
    };

    useEffect(() => {

        if (inputValue) {
            dispatch(fetchShows(inputValue));
        }
    }, [inputValue, dispatch]);

    const showOptions = shows.map((item) => item.show.name);

    const onSelectShow = (value: string | null) => {
        const selectedShow = shows.find((item) => item.show.name === value);
        if (selectedShow) {
            dispatch(fetchShowInfo(selectedShow.show.id));
            navigate(`/shows/${selectedShow.show.id}`);
        }
    };

    return (
        <>
        <div>
            <Autocomplete
                disablePortal
                options={showOptions}
                loading={loading}
                getOptionLabel={(option) => option || ""}
                onInputChange={(_, value) => onInputHandle(value)}
                onChange={(_, value) => onSelectShow(value)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search Movie" />}
            />
        </div>
            {show ? (
                <div style={{ marginTop: '20px', display: 'flex', gap: '30px' }}>
                    {show.image && <img src={show.image.medium} alt={show.name} />}
                    <div>
                        <h2>{show.name}</h2>
                        {show.summary}
                    </div>
                </div>
            ) : (
                <div>
                    <p>No show available</p>
                </div>
            )}
        </>
    );
};

export default Home;
