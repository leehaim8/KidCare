import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination"; 

const ResourceLibrary = () => {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    useEffect(() => {
        async function fetchCards() {
            try {
                const response = await fetch(`http://localhost:8080/api/resources`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCards(data);
                } else {
                    const errorData = await response.json();
                    alert(`Failed to fetch cards: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error fetching cards:", error);
                alert("An error occurred while fetching cards. Please try again.");
            }
        }

        fetchCards();
    }, []);

    // Filter cards by type
    const professionalCards = cards.filter(
        (card) => card.type === "Professional Development"
    );
    const supportCards = cards.filter(
        (card) => card.type === "Emotional and Behavioral Support"
    );
    const activityCards = cards.filter(
        (card) => card.type === "Classroom Tools and Activities"
    );

    // Filter cards by search query
    const filteredProfessionalCards = professionalCards.filter(
        (card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredSupportCards = supportCards.filter(
        (card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredActivityCards = activityCards.filter(
        (card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="Resurce-page">
            <Header />
            <header className="header">
                <h1>Resource Library</h1>
            </header>
            <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    className="search-input"
                />
            <section className="cards-container">
                <h2>Professional Development</h2>
                <Swiper spaceBetween={50} slidesPerView={2.2} grabCursor={true}>
                    {filteredProfessionalCards.map((card) => (
                        <SwiperSlide key={card.id}>
                            <div
                                className="card"
                                style={{ backgroundImage: `url(${card.image})` }}
                                onClick={() => window.open(card.link, "_blank")}
                            >
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2>Emotional and Behavioral Support</h2>
                <Swiper spaceBetween={50} slidesPerView={2.2} grabCursor={true}>
                    {filteredSupportCards.map((card) => (
                        <SwiperSlide key={card.id}>
                            <div
                                className="card"
                                style={{ backgroundImage: `url(${card.image})` }}
                                onClick={() => window.open(card.link, "_blank")}
                            >
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2>Classroom Tools and Activities</h2>
                <Swiper spaceBetween={50} slidesPerView={2.2} grabCursor={true}>
                    {filteredActivityCards.map((card) => (
                        <SwiperSlide key={card.id}>
                            <div
                                className="card"
                                style={{ backgroundImage: `url(${card.image})` }}
                                onClick={() => window.open(card.link, "_blank")}
                            >
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </div>
    );
};

export default ResourceLibrary;
