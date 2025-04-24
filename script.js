document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu ul');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu ul li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('show');
        });
    });
    
    // Filtro de veículos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vehicleGrid = document.querySelector('.vehicle-grid');
    
    // Dados dos veículos (simulando um banco de dados)
    const vehicles = [
        {
            id: 1,
            name: 'Fiat Argo Drive',
            type: 'economico',
            img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            passengers: 5,
            transmission: 'Automático',
            price: 'R$ 120',
            period: '/dia'
        },
        {
            id: 2,
            name: 'Volkswagen Polo',
            type: 'economico',
            img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            passengers: 5,
            transmission: 'Manual',
            price: 'R$ 100',
            period: '/dia'
        },
        {
            id: 3,
            name: 'Jeep Renegade',
            type: 'suv',
            img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            passengers: 5,
            transmission: 'Automático',
            price: 'R$ 200',
            period: '/dia'
        },
        {
            id: 4,
            name: 'Toyota Corolla',
            type: 'luxo',
            img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            passengers: 5,
            transmission: 'Automático',
            price: 'R$ 250',
            period: '/dia'
        },
        {
            id: 5,
            name: 'Hyundai HB20',
            type: 'economico',
            img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            passengers: 5,
            transmission: 'Manual',
            price: 'R$ 110',
            period: '/dia'
        },
        {
            id: 6,
            name: 'Audi A3',
            type: 'luxo',
            img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            passengers: 5,
            transmission: 'Automático',
            price: 'R$ 300',
            period: '/dia'
        }
    ];
    
    // Função para renderizar veículos
    function renderVehicles(filter = 'all') {
        vehicleGrid.innerHTML = '';
        
        const filteredVehicles = filter === 'all' 
            ? vehicles 
            : vehicles.filter(vehicle => vehicle.type === filter);
        
        filteredVehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.className = 'vehicle-card';
            vehicleCard.innerHTML = `
                <div class="vehicle-img">
                    <img src="${vehicle.img}" alt="${vehicle.name}">
                </div>
                <div class="vehicle-info">
                    <h3>${vehicle.name}</h3>
                    <div class="vehicle-details">
                        <span><i class="fas fa-users"></i> ${vehicle.passengers}</span>
                        <span><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
                    </div>
                    <div class="vehicle-price">
                        ${vehicle.price} <span>${vehicle.period}</span>
                    </div>
                    <button class="btn" onclick="reservarVeiculo(${vehicle.id})">Reservar</button>
                </div>
            `;
            vehicleGrid.appendChild(vehicleCard);
        });
    }
    
    // Inicializar veículos
    renderVehicles();
    
    // Adicionar eventos aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            // Filtrar veículos
            const filter = this.getAttribute('data-filter');
            renderVehicles(filter);
        });
    });
    
    // Geolocalização e Mapa
    const getLocationBtn = document.getElementById('get-location');
    const storeSelect = document.getElementById('store-select');
    let map;
    let userMarker;
    let stores = [
        { name: 'São Paulo - Centro', coords: { lat: -23.5505, lng: -46.6333 } },
        { name: 'Rio de Janeiro - Copacabana', coords: { lat: -22.9068, lng: -43.1729 } },
        { name: 'Salvador - Pituba', coords: { lat: -12.9714, lng: -38.5014 } }
    ];
    
    // Inicializar mapa
    function initMap() {
        // Centro do mapa no Brasil
        const center = { lat: -15.793889, lng: -47.882778 };
        
        // Configurações do mapa
        const mapOptions = {
            zoom: 4,
            center: center,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        };
        
        // Criar mapa
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        // Adicionar marcadores das lojas
        stores.forEach(store => {
            new google.maps.Marker({
                position: store.coords,
                map: map,
                title: store.name,
                icon: {
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
            });
        });
    }
    
    // Obter localização do usuário
    getLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Centralizar mapa na localização do usuário
                    map.setCenter(userLocation);
                    map.setZoom(12);
                    
                    // Remover marcador anterior se existir
                    if (userMarker) {
                        userMarker.setMap(null);
                    }
                    
                    // Adicionar novo marcador
                    userMarker = new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        title: 'Sua Localização',
                        icon: {
                            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }
                    });
                    
                    // Encontrar loja mais próxima
                    findNearestStore(userLocation);
                },
                function(error) {
                    alert('Não foi possível obter sua localização: ' + error.message);
                }
            );
        } else {
            alert('Geolocalização não é suportada pelo seu navegador.');
        }
    });
    
    // Selecionar loja no dropdown
    storeSelect.addEventListener('change', function() {
        if (this.value) {
            const [lat, lng] = this.value.split(',').map(Number);
            const selectedStore = { lat, lng };
            
            // Centralizar mapa na loja selecionada
            map.setCenter(selectedStore);
            map.setZoom(15);
            
            // Remover marcador do usuário se existir
            if (userMarker) {
                userMarker.setMap(null);
            }
        }
    });
    
    // Função para encontrar loja mais próxima
    function findNearestStore(userLocation) {
        let nearestStore = null;
        let minDistance = Infinity;
        
        stores.forEach(store => {
            const distance = calculateDistance(
                userLocation.lat, userLocation.lng,
                store.coords.lat, store.coords.lng
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestStore = store;
            }
        });
        
        if (nearestStore) {
            alert(`A loja mais próxima é: ${nearestStore.name} (${minDistance.toFixed(1)} km)`);
            
            // Selecionar a loja no dropdown
            const storeIndex = stores.findIndex(s => s.name === nearestStore.name);
            storeSelect.selectedIndex = storeIndex + 1; // +1 porque o primeiro é "Selecione uma loja"
        }
    }
    
    // Função para calcular distância entre dois pontos em km
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
});

// Função global para reservar veículo (simulação)
function reservarVeiculo(vehicleId) {
    alert(`Você reservou o veículo com ID ${vehicleId}. Em breve entraremos em contato!`);
}