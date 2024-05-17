document.addEventListener('DOMContentLoaded', () => {
    let location = document.getElementById('location1');
    location.addEventListener('load', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showLocation, checkError);
        }
    });

    const showLocation = async (position) => {
        let response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        );
        let data = await response.json();
        location.innerText = `${data.address.city}, ${data.address.country}`;
    };

    const checkError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                location.innerText = "Please allow access to location";
                break;
            case error.POSITION_UNAVAILABLE:
                location.innerText = "Location Information unavailable";
                break;
            case error.TIMEOUT:
                location.innerText = "The request to get user location timed out";
        }
    };
});