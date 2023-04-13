const admin = require('firebase-admin');

// Import app from Firebase.config.js
import { app } from '../../../Firebase/Firebase.config.js';

// Initialize Firebase Admin SDK
admin.initializeApp(app);

export default async (req, res) => {
    // Create user with createUser
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: true,
        displayName: req.body.name,
        disabled: false,
        uid: req.body.uid
    }).then((userRecord) => {
        console.log('Successfully created new user:', userRecord.toJSON());
      })
      .catch((error) => {
        console.error('Error creating new user:', error);
      });
}