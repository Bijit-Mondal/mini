var express = require('express');
const request = require('request');
const {spawn} = require('child_process');

var router = express.Router();
/* TODO: Generate API KEY from https://console.developers.google.com  */
const YOUTUBE_API_KEY = 'AIzaSyBlh7cAfjq_xEAWwT1F9xRh-M1zfnSBG9E';

/* GET video listing. */
router.get('/:query', function(req, res, next) {
    let query = req.params.query;/*already encoded */
    
    /* Youtube API Request with KEY */
    request(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${YOUTUBE_API_KEY}`,
    (err,resp,body)=>{
        if(err){
            console.log('YOUTUBE_API - Request failed');
            next(err);
        }
        else{
            res.send(body).status(200);
        }
    });

});

/* Send mp3 download for video_id youtube */
router.get('/download/audio/:vid/:name?', (req,res,next)=>{
    let {vid,name} = req.params;
    vid = decodeURIComponent(vid);/*video id */
    res.redirect(`https://loader.to/api/button/?f=m4a&url=https://youtube.com/watch?v=${vid}&color=48D1CC`);
});

/* Send mp4 download for video_id youtube */
router.get('/download/video/:vid/:name?', (req,res,next)=>{
    let {vid,name} = req.params;
    vid = decodeURIComponent(vid);/*video id */
    res.redirect(`https://yt2mp3s.me/api/widget/videos/${vid}`);
});

module.exports = router;

/**
 * 19

Ffmpeg outputs all of its logging data to stderr, 
to leave stdout free for piping the output data to some other program 
or another ffmpeg instance.

When running ffmpeg as an automatic process it's often useful give the option

-loglevel error
which turns it completely mute in a normal scenario and only outputs 
the error data (to stderr), which is normally what you would expect from a command-line program.
 */
