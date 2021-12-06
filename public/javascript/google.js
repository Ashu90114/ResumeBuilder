console.log("hellewww");


<script type="module">
            // Import the functions you need from the SDKs you need
            import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
            import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
            import {getAuth , GoogleAuthProvider ,signInWithPopup, getRedirectResult ,signOut} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries

            // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            const firebaseConfig = {
            apiKey: "AIzaSyCHaHHvlzej90WIivCbAoNTbA1FEju9SRY",
            authDomain: "resume-builder-dba08.firebaseapp.com",
            projectId: "resume-builder-dba08",
            storageBucket: "resume-builder-dba08.appspot.com",
            messagingSenderId: "1018836653140",
            appId: "1:1018836653140:web:6e17afcb1df0305d4cc9c1",
            measurementId: "G-R5DNXLCM0Q"
            };

            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider(app);
            const analytics = getAnalytics(app);

            document.getElementById("login").addEventListener("click", function(){
                signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorMessage)
            });

            })


            document.getElementById("logout").addEventListener("click", function(){
            signOut(auth)

            .then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });

            })

</script>