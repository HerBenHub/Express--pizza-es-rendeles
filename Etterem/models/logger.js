import express from 'express';

export default function logger(req, res, next) {
    console.log(req.method, req.body);
    next();
}

