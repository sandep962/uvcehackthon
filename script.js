document.addEventListener('DOMContentLoaded', () => {
    const emergencyButton = document.getElementById('btn-emergency');
    const locationButton = document.getElementById('btn-location');
    const locationModal = document.getElementById('location-modal');
    const emergencyModal = document.getElementById('emergency-modal');
    const closeModal = document.querySelectorAll('.modal .close');
    const steps = document.querySelectorAll('.step');
    const detailContents = document.querySelectorAll('.detail-content');
    const policeButton = document.getElementById('btn-police');
    const hospitalButton = document.getElementById('btn-hospital');
    const fireButton = document.getElementById('btn-fire');
    const disasterButton = document.getElementById('btn-disaster');

    emergencyButton.addEventListener('click', () => {
        emergencyModal.style.display = 'block';
    });

    locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    closeModal.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        });
    });

    document.querySelectorAll('.emergency-option').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            window.location.href = `/${targetId}-login.html`;
        });
    });

    policeButton.addEventListener('click', () => {
        window.location.href = 'tel:100';
    });

    hospitalButton.addEventListener('click', () => {
        window.location.href = 'tel:108';
    });

    fireButton.addEventListener('click', () => {
        window.location.href = 'tel:101';
    });

    disasterButton.addEventListener('click', () => {
        window.location.href = 'tel:112';
    });

    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        locationModal.style.display = 'block';

        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 15
        });

        new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: 'Your Location'
        });

        // Fetch and show alerts
        fetch(`/get-alerts?lat=${latitude}&lng=${longitude}`)
            .then(response => response.json())
            .then(alerts => {
                alerts.forEach(alert => {
                    new google.maps.Marker({
                        position: { lat: alert.lat, lng: alert.lng },
                        map: map,
                        title: alert.message,
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                        }
                    });
                });
            });
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert('User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                alert('The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                alert('An unknown error occurred.');
                break;
        }
    }

    steps.forEach(step => {
        step.addEventListener('click', () => {
            const target = document.querySelector(step.dataset.target);
            detailContents.forEach(content => content.style.display = 'none');
            target.style.display = 'block';
        });
    });
});
