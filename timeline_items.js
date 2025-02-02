const timelineItems = [
    {
        date: "January 05, 2025",
        title: "Mini Concert",
        description: "Organized by Loka Kshema SatSang, performed 5 songs.",
        type: "youtube", // or "image"
        media: {
            youtubeId: "PktZBs7JqhI"
        }
    },
    {
        date: "October 12, 2024",
        title: "Vijayadasami 2024",
        description: "A festival and an annual event organized by Shruthi Swara Laya.",
        type: "youtube", // or "image"
        media: {
            youtubeId: "cNjTR_hKQI8"
        }
    },
    {
        date: "April 23, 2023",
        title: "Bay Area Kala Utzavam 2023",
        description: "An annual event organized by Shruthi Swara Laya.",
        type: "youtube", // or "image"
        media: {
            youtubeId: "Hrp2e5ViX-w"
        }
    },
    {
        date: "March 04, 2023",
        title: "Maithry Utzav 2023",
        description: "Vocal competitions organized by Maithry, won 2nd prize for our group performance!",
        type: "youtube", // or "image"
        media: {
            youtubeId: "VnTqIXSjOUY"
        }
    },
    {
        date: "September 26, 2022",
        title: "Navarathri 2022",
        description: "Performed during Navarathri celebrations at Fremont Temple.",
        type: "youtube", // or "image"
        media: {
            youtubeId: "IpqG4x7QjZE"
        }
    },
 
    // {
    //     date: "March 1, 2024",
    //     title: "International Expansion",
    //     description: "Opened our first international office in London.",
    //     type: "image",
    //     media: {
    //         src: "/api/placeholder/400/300",
    //         alt: "Office Opening"
    //     }
    // }
];

// Function to create a YouTube container
function createYoutubeContainer(youtubeId, duration) {
    return `
        <a href="https://www.youtube.com/watch?v=${youtubeId}" 
           class="youtube-container"
           target="_blank"
           rel="noopener noreferrer">
            <picture>
                <!-- Try maxresdefault first -->
                <source srcset="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" media="(min-width: 1px)"/>
                <!-- Then try hqdefault -->
                <source srcset="https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg" media="(min-width: 1px)"/>
                <!-- Finally, use mqdefault as last resort -->
                <img src="https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg" 
                    alt="" 
                    class="youtube-thumbnail"
                    onerror="this.onerror=null; this.src='/api/placeholder/400/300'; this.classList.add('fallback');"/>
            </picture>
            <div class="youtube-play-button"></div>
            <div class="youtube-title">Watch on YouTube</div>           
        </a>
    `;
}

// Function to create an image container
function createImageContainer(src, alt) {
    return `<img src="${src}" alt="${alt || 'Timeline image'}">`;
}

// Function to create a timeline item
function createTimelineItem(item, index) {
    const position = index % 2 === 0 ? 'right' : 'left';
    const mediaContent = item.type === 'youtube' 
        ? createYoutubeContainer(item.media.youtubeId, item.media.duration)
        : createImageContainer(item.media.src, item.media.alt);

    return `
        <div class="timeline-item ${position}">
            <div class="content">
                <div class="date">${item.date}</div>
                <h3 class="title">${item.title}</h3>
                <p class="description">${item.description}</p>
                <div class="media">
                    ${mediaContent}
                </div>
            </div>
        </div>
    `;
}

// Function to render the entire timeline
function renderTimeline(items, containerId = 'timeline-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }

    const timelineHTML = items.map((item, index) => createTimelineItem(item, index)).join('');
    container.innerHTML = timelineHTML;
}

// Function to add a new timeline item
function addTimelineItem(item, containerId = 'timeline-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }

    const currentItems = container.children.length;
    const newItemHTML = createTimelineItem(item, currentItems);
    container.insertAdjacentHTML('beforeend', newItemHTML);
}

// Function to add multiple timeline items
function addTimelineItems(items, containerId = 'timeline-container') {
    items.forEach(item => addTimelineItem(item, containerId));
}
