import React from "react";
import {Routes, Route} from "react-router-dom";
import { PlayersCard } from "./modules/players/components/playersCard";
import { NotFoundPages } from "./common/components/helpers/notFoundPages";
import { SignUp } from "./modules/ authorization/signUp";
import { Layout } from "./common/components/layout";
import { SignIn } from "./modules/ authorization/signIn";
import {ProtectedRoute} from "./common/components/helpers/protectedRoad";
import {TeamsCard} from "./modules/teams/components/teamsCard";
import {AddTeam} from "./modules/teams/components/addTeam";
import {AddPlayer} from "./modules/players/components/addPlayers";
import {TeamDetailing} from "./modules/teams/components/TeamDetailing";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PlayerDetail} from "./modules/players/components/playerDetail";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route
                    path="/layout"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="teamsCard"
                        element={
                            <ProtectedRoute>
                                <TeamsCard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="teamsCard/:id"
                        element={
                            <ProtectedRoute>
                                <TeamDetailing/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="addTeam"
                        element={
                            <ProtectedRoute>
                                <AddTeam/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="playersCard"
                        element={
                            <ProtectedRoute>
                                <PlayersCard/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="playersCard/:id"
                        element={
                            <ProtectedRoute>
                                <PlayerDetail/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="addPlayer"
                        element={
                            <ProtectedRoute>
                                <AddPlayer/>
                            </ProtectedRoute>
                        }
                    />

                </Route>

                <Route path="*" element={<NotFoundPages />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
