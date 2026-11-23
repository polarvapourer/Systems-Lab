// The lecture deck spans both weeks. Page numbers refer to that combined deck.
const wiresharkLab = {
  title: 'Friday lab · Read an HTTP exchange in Wireshark',
  text: 'For Friday’s lab, open the provided capture file in Wireshark. In a plaintext HTTP capture, the http display filter shows matching packets while keeping the rest of the capture intact. Expand the HTTP details or use Follow TCP Stream to read the exchange in order. Match a response to its request within the conversation. Other packets can appear between the two.',
  example: 'A trace shows “GET /timetable HTTP/1.1”, “Host: example.org”, then “HTTP/1.1 404 Not Found”. The request reached an HTTP responder. The responder reports that it could not find the resource. A successful TCP transfer can carry this status.',
  steps: ['GET requests a representation. POST asks the server to process submitted data. User-Agent identifies client software and Accept lists response types it can handle.', 'A 200 status means success. Content-Type describes the body and Content-Length, when supplied, gives its length in octets. Set-Cookie is a response header. The client may later send a matching Cookie. In HTTP/1.1, Connection: close indicates closure after the exchange.', 'For an ordinary encrypted HTTPS capture without keys, addresses, timing and sizes may be visible while the request path and body are encrypted. An empty http filter alone cannot tell you that no web request occurred.']
};

export const networkGuides = [
  {
    week: 10,
    aim: 'Week 10 introduced packet switching, the seven OSI layers, HTTP and the choice between TCP and UDP. The detailed walkthrough covered layers 1 and 2 and ended at MAC addressing. The Wireshark exercise is for Friday’s lab.',
    sections: [
      {
        title: 'The Internet as a network of networks',
        text: 'Opening a web page starts at an end system, or host. The browser acts as a client and the web server provides the resource. An access network connects the host to its first router. Further routers connect networks run by different operators. The Internet is their interconnection using IP. The Web is one service that uses it. The lecture traced this distinction back to ARPANET, whose international links reached the UK and Norway in 1973. The Web came later, with Tim Berners-Lee’s work at CERN.',
        example: 'For an example from the assigned reading, trace a request from home. Wi-Fi carries the frame to the home network. The router passes the packet to the access provider. The provider can buy transit, peer with another network at an exchange point, or reach a content provider directly. The server may be only a few networks away.',
        steps: ['The edge includes the machines running the application. A host can be a client for one exchange and a server for another.', 'The access technology describes how you join the network. DSL shares a telephone pair using frequency bands. Cable broadband often shares a fibre/coax segment among homes. Fibre can run to the home itself. Cellular and satellite access use radio.', 'A map grouping websites by shared visitors shows browsing habits. To explain the path a packet takes, you need information about links and routers.']
      },
      {
        title: 'Why split a message into packets?',
        text: 'A circuit reserves capacity along a path for a session. Frequency division gives it a band of frequencies. Time division gives it recurring time slots. Packet switching divides a message into units with control information in a header and data in a payload. The header format tells a receiver where each field is. Depending on the protocol, those fields can include addresses, priority or timing. Some formats also add a trailer. A layer can carry another layer’s whole message as its payload. Packets from different senders take turns as they arrive. This on-demand sharing is called statistical multiplexing.',
        example: 'Five users share a 20 Mbit/s link. Five equal circuits give each user 4 Mbit/s, even while four are silent. With packet switching, one active sender could use nearly the full rate. When several send bursts together, packets can wait in the output queue. A full queue can drop an arriving packet.',
        steps: ['Capacity reserved for a silent circuit can go unused.', 'An IP packet carries a destination that routers can look up independently. Routes can change between packets.', 'Variable waiting times and different paths can affect arrival order. An upper layer can recover the original order when the application requires it.']
      },
      {
        title: 'What the seven layers do',
        text: 'Start at the wire. Physical (1) represents bits as signals. Data link (2) frames data for one link. Network (3) forwards packets across networks. Transport (4) delivers data between application endpoints. Session (5) manages a dialogue, including checkpoints. Presentation (6) handles representation, such as text encoding or compression. Application (7) defines exchanges such as HTTP requests.',
        table: {
          caption: 'Follow one HTTP request down the OSI stack',
          headings: ['Layer', 'Job in this example'],
          rows: [
            ['7 · Application', 'HTTP specifies the request for a named resource.'],
            ['6 · Presentation', 'Both ends need to interpret the chosen data representation.'],
            ['5 · Session', 'A dialogue may need state or synchronisation between exchanges.'],
            ['4 · Transport', 'TCP carries bytes to the receiving application endpoint.'],
            ['3 · Network', 'Routers use the IP destination to move the packet towards the host.'],
            ['2 · Data link', 'Ethernet or Wi-Fi frames carry data to a neighbour.'],
            ['1 · Physical', 'Electrical, light or radio signals carry the bits.']
          ]
        },
        example: 'A browser works over both Wi-Fi and Ethernet because it can ask for the same transport service on either link. At the far end the peer HTTP implementation interprets the request. The two applications need to agree on HTTP, even though their local links can differ.',
        steps: ['In the five-layer Internet teaching model, applications take care of presentation and session functions when needed.', 'The four-layer TCP/IP diagram on slide 110 also groups physical and data link into a single link layer.', 'A switch can select an output using a frame address. A router needs the network-layer destination. Many link technologies can carry the same IP packet format, the “narrow waist” of the stack.']
      },
      {
        title: 'How HTTP, IP, TCP and UDP fit together',
        text: 'A protocol sets rules for what peers send and how they respond. HTTP defines what a browser asks a web server for. IP addresses the packet and lets routers forward it towards the destination. The transport protocol determines what delivery service the application gets.',
        example: 'Compare sending an email with talking on a live call. One missing chunk can change an email’s meaning. In a call, audio that arrives after its playback time is already too late.',
        steps: ['Mail transfer with SMTP uses TCP. TCP numbers the bytes, acknowledges receipt and retransmits missing data so that the receiving application can read the bytes in order.', 'For the three-way TCP handshake, the client sends SYN, the server replies SYN + ACK, and the client acknowledges with ACK. The exchange establishes connection state at both ends. The final ACK can be sent before any application data.', 'A live voice application can use UDP and play the next available audio chunk after a loss. UDP provides no built-in handshake, retransmission or ordering. The application can add recovery when it is worth the wait.']
      },
      {
        title: 'How a signal carries bits',
        text: 'A symbol is one choice from the signal states the receiver can distinguish in an interval. Pulse amplitude modulation (PAM) varies the signal level. Frequency-shift keying changes carrier frequency and phase-shift keying changes phase relative to a reference. QAM uses amplitude and phase together. Modulation represents data in a signal. Demodulation recovers symbols from the received signal. A modem performs both operations.',
        example: 'A link assigns 00, 01, 10 and 11 to four amplitude levels in ascending order. It sends 10 | 00 | 11. The receiver sees levels 2, 0 and 3 and recovers six bits.',
        steps: ['With M = 2ᵏ distinguishable states, each symbol encodes k bits. Four states give two bits per symbol. At 600,000 symbols/s this carries 1.2 Mbit/s before overhead.', 'More levels in the same signal range place neighbouring levels closer together. Noise can then move a sample across a decision threshold.', 'In the lecture discussion, 0 V and 1 V at the sender arrived as 0 and 50 mV. The receiver knows the alternating pilot bits in advance. It measures their received levels and sets a threshold between them. It can then recognise a later 50 mV sample as a one.']
      },
      {
        title: 'Copper, fibre and radio',
        text: 'Guided media constrain a signal to a physical path. Twisted pair carries a voltage difference on two wires. Twisting helps both pick up similar interference, which a differential receiver can reject. Coaxial cable surrounds the centre conductor with a conductive shield. Fibre guides light. Radio propagates through space and can be affected by obstacles, interference and other transmitters.',
        example: 'A laptop uses radio to a campus access point, then the campus uses optical fibre between buildings. The first hop and the next hop use different physical signals. Both can carry a frame that contains an IP packet.'
      },
      {
        title: 'Finding frame boundaries',
        text: 'A receiver needs a rule for finding the start and end of a frame. A low signal on its own could be idle time or data under a simple encoding. A frame format can define synchronisation, addresses, a payload and an error check. For a fixed-width frame, once the start is known the receiver can count to the next boundary.',
        example: 'Use the lecture’s toy format. Each eight-bit frame starts with 101 and has five payload bits. Starting at a known boundary, read 10110101 10100011.',
        steps: ['Split into two groups of eight before interpreting either group.', 'Remove the first three bits from each group. The payloads are 10101 and 00011. A 101 inside a payload is legal.', 'Only five of the eight bits carry data. The payload fraction is 5/8, or 62.5%. Across 24 such frames there are 24 × 5 = 120 payload bits.']
      },
      {
        title: 'Taking turns on Wi-Fi',
        text: 'Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) lets stations contend for a shared radio channel. A station senses the channel and defers while it is busy. During contention, stations count down random backoff counters in idle slots after the required idle interval. A station freezes its counter while another transmits.',
        example: 'After A finishes, B has two slots left and C has five. With both hearing each other, B reaches zero first. C has three left, waits through B’s exchange, then resumes when permitted.',
        steps: ['Two stations can still reach zero together. For ordinary acknowledged unicast data, a sender expects a link acknowledgement (ACK).', 'A missing ACK can mean collision, damaged data or a lost ACK. The sender can contend again and retry.', 'This ACK concerns neighbouring wireless interfaces. A frame carrying UDP can receive a Wi-Fi ACK.']
      },
      {
        title: 'Error detection and local addresses',
        text: 'Redundant check bits let a receiver test whether a frame is consistent with what it received. A failed check can lead to discard and a retry. Correcting errors without a retransmission requires a code with enough information to identify the original data. Ethernet also carries source and destination MAC addresses for local delivery. A typical Ethernet MAC address is 48 bits, written as six hexadecimal octets.',
        example: 'In the lecture’s toy check, H, E, L, L, O have values 8, 5, 12, 12, 15. The sum is 52, whose digits sum to 7. Changing O to N gives 51 and a check of 6. Swapping H and E keeps the sum and passes the check.',
        steps: ['The check value costs space in each frame. More redundancy can improve what a suitably designed code detects or corrects. A matching check can still miss errors, as the swapped letters show. Ethernet uses a cyclic redundancy check (CRC).', 'A locally assigned address such as 02:00:00:00:00:18 is enough to illustrate the frame destination. A MAC address may be assigned by the manufacturer or configured in software.']
      },
      {
        title: 'Textbook practice · Transmission, propagation and queues',
        text: 'Transmission delay L/R is the time to put L bits onto a link sending R bits/s. Propagation delay d/v is the travel time over distance d at signal speed v. A packet can also spend time being processed and waiting in an output queue. A store-and-forward router receives a whole packet before transmitting it on the next link.',
        example: 'A 1,000-byte packet crosses two identical 4 Mbit/s links, each 100 km long. Signals travel at 200,000 km/s. Ignore processing and queuing.',
        steps: ['Convert the packet to 8,000 bits. Each transmission takes 8,000/4,000,000 s = 2 ms.', 'Propagation takes 100/200,000 s = 0.5 ms on each link. The first bit arrives at the router after 0.5 ms, the last after 2.5 ms.', 'Only then does the router begin its transmission. The last bit reaches the destination at 5 ms. Faster transmission would reduce the 2 ms term. Shortening the link would reduce the 0.5 ms term.']
      },
      {
        title: 'Textbook practice · Throughput, pipelining and loss',
        text: 'Throughput measures delivered bits per second. On an otherwise idle path the slowest link limits the sustained rate. Packet delays add along a path, but once a pipeline is full different links can carry different packets at the same time. A finite buffer drops arrivals when full.',
        example: 'Across 12, 4 and 8 Mbit/s links, the ideal bottleneck rate is 4 Mbit/s. A 6 MB file contains 48 Mbit and needs at least 12 seconds at that rate. Headers, competing traffic and setup can add time.',
        steps: ['For P equal packets and N identical store-and-forward links, the first packet needs N transmission intervals. Each later packet adds one. Ignoring other delays, total time is (N + P − 1)L/R.', 'With average arrival rate a packets/s and packet length L bits, La/R is the fraction of link capacity demanded. Sustained demand above 1 grows the backlog. Even below 1, a burst can fill a small buffer.', 'A traceroute round-trip measurement includes the return journey. It cannot by itself give the one-way transmission delay of a single link.']
      },
      {
        title: 'Textbook reading · Protocols, services and interfaces',
        text: 'A protocol tells peers the format of messages (syntax), what their fields mean and what action to take (semantics), and when to send or expect them (timing). A service describes what a layer offers its local user. A service access point identifies where that user can reach the service. A protocol data unit is the unit exchanged by peers at a particular layer.',
        example: 'A sending file application asks its local provider for a transfer. In Stallings’ confirmed-service example the receiver is informed, responds locally, and the sender is told of the result.',
        steps: ['Request and indication are local interactions at opposite ends. The first asks for service and the second reports the event.', 'Response and confirm complete a confirmed interaction. An unconfirmed service omits this return pair.', 'Peer protocol messages implement the service. A local request need not correspond to exactly one packet. A common interface allows two implementations to use different internal code.']
      },
      wiresharkLab
    ],
    checks: [
      ['One of six reserved circuits is busy. Who can use the silent circuits’ slots?', 'Under fixed time division each slot remains reserved for its circuit. Packet switching can give a waiting packet the next available transmission opportunity.'],
      ['An eight-level signal carries 500,000 symbols each second. What raw bit rate is possible?', 'Eight states encode three bits. 500,000 × 3 = 1.5 Mbit/s before framing or coding overhead.'],
      ['A three-bit sync pattern occurs in the middle of a five-bit payload. Where does the next frame start?', 'From a known start, advance eight bits in this fixed-width format. Keep the internal pattern as payload.'],
      ['What can a sender infer when its Wi-Fi ACK fails to arrive?', 'It lacks confirmation for this hop. Data or the ACK may have been lost. A collision is one possible cause.'],
      ['Which handshake message comes after SYN + ACK, and what has the exchange established?', 'The client sends ACK. Both endpoints have now exchanged and acknowledged their starting sequence numbers. Acknowledging a connection does not say that an email has been read.'],
      ['Why could a live call use UDP while an email uses TCP?', 'Late speech may miss its playback deadline. UDP lets the application decide how to handle missing audio. SMTP relies on TCP to recover missing bytes and deliver a complete message in order.'],
      ['How can a receiver recognise a one that arrives at only 50 mV?', 'A known training pattern lets it measure the levels for zero and one after attenuation. It can classify later samples using a threshold between those received levels.'],
      ['Which errors would the HELLO check catch: changing O to N, or exchanging the first two letters?', 'Changing O to N reduces the sum from 52 to 51, so the check changes from 7 to 6. Swapping the first two letters leaves the sum at 52 and passes undetected.'],
      ['Textbook practice · What changes if you double packet length on a path with fixed length and fixed link rate?', 'Transmission time doubles. The propagation time of a bit stays the same because distance and signal speed are unchanged.'],
      ['Textbook practice · How can one packet take 5 ms on two links while the path still delivers 4 Mbit/s?', 'Delay measures the journey of one packet. Once the pipeline fills, separate packets can occupy both links. The bottleneck rate limits the sustained stream.']
    ],
    checklist: ['Explain reserved capacity, packet queues and loss using a burst of traffic.', 'Name the seven OSI layers in order and explain why the same application can work over different media. Place HTTP, TCP or UDP, and IP in the stack. Explain the three TCP handshake messages.', 'Decode a symbol or frame given its format and distinguish a link acknowledgement from an end-to-end one.', 'Textbook practice: calculate transmission and propagation in the same units, then identify the bottleneck.'],
    reading: ['Weeks 10–11 lecture slides, pp. 4–38 for Internet structure, protocols and layers, pp. 39–57 for the postal analogy, TCP/UDP and the handshake, pp. 58–75 for signalling and media, and pp. 76–87 for frames, contention and MAC addresses. Friday lab preparation: pp. 142–148.', 'Kurose and Ross, Computer Networking: A Top-Down Approach (7th ed.), chapter 1, assigned pp. 29–94. See §§1.1–1.3 for the edge and core, §1.4 for the supplementary delay and throughput calculations, and §1.5 for layering.', 'Stallings with Manna, Data and Computer Communications (10th ed.), §§2.1–2.4 within the assigned pp. 55–72, for architecture, peer protocols and service primitives.']
  },
  {
    week: 11,
    aim: 'Week 11 preview from the shared slides. The lecturer plans to resume at the network layer (layer 3) and work up to layer 7. Follow a web request from its first router to the application that receives it.',
    sections: [
      {
        title: 'What a router does with a destination',
        text: 'IP provides best-effort packet delivery across connected networks. IPv4 uses 32-bit interface addresses written as four decimal octets. IPv6 uses 128 bits. Routing selects paths and supplies forwarding information. Forwarding is the local decision for a particular packet. A route can reflect several costs, including link speed, distance or policy.',
        example: 'Suppose a host has the two routes from slide 96. The prefix 192.168.1.0/24 is on its local link. The default route 0.0.0.0/0 uses gateway 192.168.1.1.',
        table: {
          caption: 'Two routes on a host connected to Ethernet',
          headings: ['Destination prefix', 'Next hop', 'Interface'],
          rows: [['192.168.1.0/24', 'Direct delivery', 'en0'], ['0.0.0.0/0', '192.168.1.1', 'en0']]
        },
        steps: ['For 192.168.1.42, the first 24 bits match the local prefix. The default also matches, but the longer prefix is more specific. Send the frame directly to the local destination.', 'For 203.0.113.9, only the default matches. Send the frame to the gateway’s MAC address. The IP destination inside the frame is still 203.0.113.9.', 'A router removes the incoming framing, selects the outgoing link and builds fresh framing. It reduces IPv4 time to live (TTL), or the IPv6 hop limit. A packet whose remaining hop count reaches zero is discarded.']
      },
      {
        title: 'Which address answers which question?',
        text: 'The link destination identifies the next interface on this link. The IP destination identifies the target across the routed path. Within TCP or UDP, a 16-bit destination port helps the receiving operating system deliver data to the appropriate socket. The source port gives the peer a return endpoint. The IP protocol field identifies which transport protocol should read the payload.',
        example: 'A browser connects from 192.0.2.7:54012 to 198.51.100.8:443 via a gateway. On the first Ethernet link the frame targets the gateway. The packet targets 198.51.100.8. The transport segment targets port 443.',
        steps: ['On the return TCP segment the source port is 443 and the destination port is 54012.', 'A TCP connection is identified by the two IP addresses and the two ports. Other clients can reach the same server port without sharing the connection.', 'On a routed path without address translation the end IP addresses persist. Each new link uses its own framing. The IPv4 TTL changes at each router.']
      },
      {
        title: 'Week 10 recap · Choosing TCP or UDP',
        text: 'TCP establishes a connection and delivers an ordered stream of bytes. It tracks sequence numbers and acknowledgements, retransmits missing bytes, and controls its sending rate. UDP sends individual datagrams and preserves their message boundaries. It has ports and a checksum field but no built-in handshake, retransmission or ordering. An application using UDP may implement additional services.',
        example: 'SMTP transfers email over TCP because the receiving side needs the complete message in order. For a live voice call, a recovered audio chunk that arrives after its playout deadline is of little use. Such an application can use UDP and decide how to handle gaps.',
        steps: ['TCP can delay delivery of later bytes while it recovers a missing earlier byte.', 'Delivering bytes reliably does not mean TCP knows where an application message ends. The application must define that boundary.', 'UDP alone gives no latency guarantee. HTTP/3 uses QUIC over UDP, with reliable streams and congestion control supplied by QUIC.']
      },
      {
        title: 'Reading TCP sequence numbers and ACKs',
        text: 'The TCP handshake lets both ends exchange and acknowledge initial sequence numbers. SYN consumes one sequence number. During ordinary data transfer a cumulative ACK gives the next byte expected in order. It confirms receipt by TCP, without saying whether a person has seen the data.',
        example: 'A client sends SYN with sequence 300. The server replies SYN + ACK with sequence 800 and acknowledgement 301. The client sends ACK 801. Assume no application bytes in the handshake.',
        steps: ['The first client data byte has sequence 301. A pure ACK consumes no sequence number.', 'A 40-byte segment starting at 301 covers bytes 301 through 340. If these arrive in order, the receiver acknowledges 341.', 'If a later segment arrives while byte 341 is missing, the cumulative acknowledgement cannot advance over the gap.']
      },
      {
        title: 'How much more can TCP send?',
        text: 'Flow control protects the receiver’s buffer. The advertised receive window (rwnd) tells the sender how much room the receiver offers. Congestion control protects the path. The sender adjusts a congestion window (cwnd) as network conditions change. Both limits apply to outstanding data, including bytes already sent and unacknowledged.',
        example: 'The receiver advertises 24 kB, the congestion window is 10 kB and 6 kB are already in flight. Assume the application has more data ready.',
        steps: ['Take the smaller window. At most 10 kB may be outstanding under these limits.', 'Subtract the 6 kB already outstanding. Another 4 kB can be sent now.', 'If a window shrinks below the amount already in flight, the allowance for new data is zero until the limits allow more. An ACK or a window update can change the answer.']
      },
      {
        title: 'Resolving a name with DNS',
        text: 'People use names while IP forwarding uses addresses. The Domain Name System (DNS) supplies records. An A record gives an IPv4 address and an AAAA record gives an IPv6 address. A client normally asks a recursive resolver. If that resolver has a valid cached answer it can return it immediately.',
        example: 'For a lookup of qmplus.qmul.ac.uk without cached records, the resolver can start at a root server. A referral directs it to the .uk servers. It follows the relevant delegations until an authoritative server for the name supplies an answer.',
        steps: ['The resolver returns an answer to the client and may cache it for the record’s TTL, a duration.', 'The client can now use the address to contact the service. DNS does not choose each router along that path.', 'The IP TTL seen on a packet is a different field with a different purpose. It limits forwarding hops.']
      },
      {
        title: 'What the application asks for',
        text: 'HTTP defines requests and responses. A browser can request a document, then request the style sheet or images named in it. HTML describes document structure and can be the body of an HTTP response. For HTTPS with HTTP/1.1 or HTTP/2, TLS normally secures TCP. HTTP/3 uses QUIC.',
        example: 'A server can provide more than one service at the same IP address. A browser normally contacts HTTPS on port 443. Plain HTTP commonly uses 80, or an explicitly configured alternative such as 8080.',
        steps: ['FTP typically uses TCP port 21 for control commands and a separate connection for file data. SSH normally uses TCP port 22 for encrypted remote login. Telnet conventionally uses TCP port 23.', 'SMTP uses TCP port 25 for mail transfer between servers. Writing and reading a message in a mail client are separate application tasks.', 'A port number is a convention. Check the application exchange before drawing conclusions about what a service returned.']
      },
      {
        title: 'Wrap and unwrap a web request',
        text: 'With plain HTTP/1.1 over TCP, the application supplies request bytes. TCP adds a segment header, IP adds a packet header, and Ethernet adds a frame header and an error-check trailer. The physical layer carries the bits as signals. The receiving stack interprets each layer’s control information and passes the payload upwards.',
        example: 'Picture one small request that fits in one segment. Read the transmitted fields from the outside in: Ethernet header | IP header | TCP header | HTTP request | Ethernet trailer.',
        steps: ['The Ethernet destination gets the frame to the next interface. IP gets the enclosed packet towards the remote server. TCP ports identify application endpoints.', 'Adding those headers is encapsulation. Splitting a longer byte stream into transport-sized pieces is segmentation. A single HTTP message can span several segments.', 'At the server the HTTP implementation can finally interpret the method and target. At an intermediate IP router, the outgoing link can use a different frame format.']
      },
      wiresharkLab,
      {
        title: 'Reading context: trust and Internet history',
        text: 'A protocol can solve one delivery problem and leave other questions open. An IP source field makes a claim about an address. Authentication supplies evidence of identity. Encryption protects content in transit. Availability is a separate concern: if traffic fills a bottleneck, legitimate requests may be delayed or dropped.',
        example: 'A browser can verify a server certificate and protect the request with TLS. It still depends on the network carrying packets to that server. A botnet is a collection of compromised hosts under common control. Excess traffic from many hosts can exhaust capacity even when the legitimate exchange is encrypted.',
        steps: ['Early packet networks such as ARPANET carried traffic before the Web existed. UCL joined ARPANET in 1973. The 1983 move to TCP/IP gave interconnected networks a common basis for exchanging packets.', 'The Web grew from work at CERN beginning in 1989. HTTP added an application for accessing resources over that existing network infrastructure.', 'Internet protocol specifications are published as RFCs. Common wire formats let independently built systems communicate.']
      }
    ],
    checks: [
      ['Why does a laptop send a frame to its gateway when opening a remote site?', 'The remote host is off-link. The gateway is the next reachable interface. Its MAC goes in the frame and the remote IP stays in the packet.'],
      ['A TCP segment starts at byte 901 and contains 20 bytes. What ACK follows if all earlier data arrived?', 'It covers bytes 901–920 inclusive. The cumulative ACK is 921, the next expected byte.'],
      ['The receive and congestion windows are 18 and 12 kB. With 7 kB outstanding, how much more may be sent?', 'The smaller limit is 12 kB. Subtract the 7 kB already outstanding to get 5 kB of new data.'],
      ['A browser has a cached IP address. Which part of opening the page can it skip?', 'While the record is valid it can skip a new DNS lookup. It still needs a route and the transport and application exchanges required for the request.'],
      ['A UDP datagram crosses Wi-Fi and gets a link ACK. Which receiver sent it?', 'The next wireless receiver on that hop. The link ACK gives no confirmation from the remote UDP application.'],
      ['A capture contains a 404 response. What succeeded?', 'An HTTP responder received a request and returned an application-level result. A 404 describes the requested resource. It gives no direct evidence of a lost TCP segment.']
    ],
    checklist: ['Use a local prefix and default route to choose the next hop.', 'Trace MAC addresses, IP addresses and ports on the outward and return paths.', 'Work a TCP handshake, cumulative ACK and sending-window example.', 'Explain how a name is resolved, then interpret a request and response in the same conversation.'],
    reading: ['Weeks 10–11 slides, pp. 39–56 revisit Week 10’s TCP/UDP introduction. The Week 11 preview uses pp. 88–109 for routing, transport and ports, pp. 110–141 for applications, encapsulation and DNS, and pp. 142–148 for the HTTP lab.', 'Stallings with Manna, Data and Computer Communications (10th ed.), §§2.1–2.5, assigned pp. 55–72. See §2.3 for TCP/IP, §2.4 for service primitives and §2.5 for SMTP, FTP and SSH.', 'Kurose and Ross, Computer Networking: A Top-Down Approach (7th ed.), chapter 1, assigned pp. 29–94. See §§1.1 and 1.5 for protocols and encapsulation, §1.6 for security concepts and §1.7 for history.']
  }
];
