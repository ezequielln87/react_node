import React from 'react';

export default function Dashboard() {
    return (
        <>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Dashboard</h2>
                </div>
            </div>
            <hr />
            <div className="row mb-3">
                <div className="col-lg-3 col-sm-6">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <i className="fas fa-users fa-3x"></i>
                            <h6 className="card-title">Usuários</h6>
                            <h2 className="lead">147</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="card bg-danger text-white">
                        <div className="card-body">
                            <i className="fas fa-file fa-3x"></i>
                            <h6 className="card-title">Artigos</h6>
                            <h2 className="lead">63</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            <i className="fas fa-eye fa-3x"></i>
                            <h6 className="card-title">Visitas</h6>
                            <h2 className="lead">648</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <i className="fas fa-comments fa-3x"></i>
                            <h6 className="card-title">Comentários</h6>
                            <h2 className="lead">17</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}