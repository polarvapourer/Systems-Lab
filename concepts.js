export const guides = [
  {
    "week": 1,
    "aim": "Recognise a computer by the work it can do, identify its parts, and follow an instruction and its data through a real device.",
    "sections": [
      {
        "title": "Which devices count as computers?",
        "text": "A program is a sequence of instructions. A programmable computer follows instructions that operate on data. A general-purpose machine such as a laptop can run many applications. An embedded computer controls part of a product, often under tight limits on space, power or response time. A server is defined by the service it supplies to other machines. These descriptions can overlap.",
        "example": "A bicycle light with a simple switch changes state electrically. A programmable bicycle light can read a motion sensor, time a delay and choose a flashing pattern. Identify the instruction-controlled behaviour before classifying an unfamiliar circuit."
      },
      {
        "title": "Operating systems and kernels",
        "text": "An operating system allocates processor time and memory, controls access to devices and offers services to applications. Its kernel is the part that manages these resources directly. Windows and macOS are desktop examples. A Linux distribution packages the Linux kernel with tools and applications. Android also uses a Linux-based kernel. Small controllers can execute firmware directly.",
        "example": "If an OS survey counts desktop browsing, it leaves out most activity on routers and small controllers. State which devices or activities a comparison counts."
      },
      {
        "title": "Processor, memory and I/O",
        "text": "The CPU executes instructions. The control unit coordinates their execution, the arithmetic logic unit (ALU) performs arithmetic and logic, and registers hold operands, addresses and intermediate results. RAM holds instructions and data currently in use. Ordinary RAM needs power to retain them. Flash, SSDs and hard disks retain saved data when powered down. Input devices supply data; output devices act on a result.",
        "example": "A heat sensor supplies a temperature reading. A heater relay is an output even though it displays nothing. Firmware in non-volatile memory can start the controller again after a power cut."
      },
      {
        "title": "Connecting the components",
        "text": "A motherboard is the circuit board that supports and connects components. An interconnect carries information between them. A bus is a communication path that several components may share. An address identifies the location or device, data is the value transferred, and a control signal can request a read or a write. Modern machines also use dedicated links.",
        "example": "A CPU stores a sample in RAM by specifying an address and a value and requesting a write. Giving the address alone cannot tell memory what to store."
      },
      {
        "title": "The stored-program model",
        "text": "In the classical von Neumann model, instructions and data occupy the same addressable memory and share its connection to the processor. A new program can change the machine’s behaviour by changing stored instructions. Instruction fetches and data transfers can compete for the same connection. Real machines may have multiple cores, specialist processors and separate instruction and data caches.",
        "example": "Trace an instruction that adds two readings already in registers.",
        "steps": [
          "Fetch. The program counter (PC) identifies the instruction address. The processor reads its encoded instruction.",
          "Decode. The control unit interprets the operation and the registers named as operands.",
          "Execute. The ALU adds the values and the CPU writes the sum to the destination register. Execution continues at the next instruction unless control flow changes."
        ]
      },
      {
        "title": "From components to a system on a chip",
        "text": "A microprocessor implements the CPU. A microcontroller typically combines a processor, memory and peripheral interfaces for control tasks. A system on a chip (SoC) integrates several system functions, often CPU cores, a GPU and controllers. Power-management circuitry supplies and adjusts electrical power. A functional diagram can show separate roles even when they share a chip.",
        "example": "A desktop motherboard may provide replaceable RAM modules and add-in cards. Placing several functions in a phone SoC saves board space and can reduce energy spent moving data. Replacing or upgrading one block can then be harder. More cores help when the work can be divided."
      },
      {
        "title": "A rack of computers working together",
        "text": "A rack can hold multiple server machines, each with processors, RAM and network connections. A data centre provides networking, storage, power and cooling across racks. An online service may distribute work between servers or hold copies of data on more than one machine. Communication and coordination then affect how quickly users get results.",
        "example": "A camera sends a recording to a named online service. DNS can resolve the service name to an IP address. If the required DNS lookup fails and no cached answer is available, the camera may be unable to find an otherwise working server."
      },
      {
        "title": "Worked trace: a field recorder",
        "text": "Follow one measurement from the microphone to a saved recording. Name the component and the data it handles at each stage.",
        "example": "The battery is removed just after a recording. Which data survives?",
        "steps": [
          "Input circuitry converts a microphone signal into digital samples. The controller places the samples in a RAM buffer.",
          "The CPU follows the recording program. It reads the samples and prepares a block to store.",
          "The storage controller writes the block to flash. Completed writes persist without power; samples still held only in the volatile buffer can be lost.",
          "A common error is to call the flash drive ‘more RAM’. Both store bits, but they have different roles during recording."
        ]
      }
    ],
    "checks": [
      [
        "A vending machine receives a contactless payment and releases a drink. Identify an input and output, and explain where an unsaved running total would usually be held.",
        "The reader provides payment information as input. The motor or release solenoid is an output. The working total can be held in RAM while the program runs. Save it to non-volatile storage if it must survive a power cut."
      ],
      [
        "A student identifies a CPU, GPU and memory controller in a phone diagram, then concludes the board must contain three separate chips. What evidence is missing?",
        "The diagram identifies functions. A chip layout or package description is needed to establish the physical boundaries. An SoC can contain all three functions on one chip and communicate with external RAM."
      ]
    ],
    "checklist": [
      "Classify an unfamiliar device by its program, inputs, outputs and role.",
      "Label CPU, ALU, registers, RAM, persistent storage and interconnect on a data-flow sketch.",
      "Trace fetch, decode and execute, including the role of the PC.",
      "Compare an integrated phone with a modular desktop or rack server.",
      "Explain an OS’s role and why an OS usage comparison needs a defined population."
    ],
    "reading": [
      "ECS404-1 slides, PDF pp. 39–64: devices and operating systems; pp. 74–96: architecture and servers; pp. 99–117: laptops, phones and integration.",
      "Week 1 course notes, printed pp. 11–18: kinds of computer; pp. 19–30: device-level architecture."
    ]
  },
  {
    "week": 2,
    "aim": "Interpret a fixed-width bit pattern, perform arithmetic at that width, and explain what changes when the same bits are read using another representation.",
    "sections": [
      {
        "title": "Bits, width and meaning",
        "text": "A bit has two possible states. A byte has eight bits. With n independent bits there are 2ⁿ patterns. Unsigned integers assign those patterns to 0 through 2ⁿ − 1. A pattern can instead encode signed data, text or flags according to the agreed interpretation. Binary logic works with two distinguishable physical states, such as two voltage ranges.",
        "example": "To label 300 items uniquely you need nine bits: eight give 256 patterns, while nine give 512. The number of possible patterns is one greater than the largest unsigned value."
      },
      {
        "title": "Place value and changing base",
        "text": "In base b the columns from right to left are worth 1, b, b² and so on. Read a numeral by adding each digit times its column weight. To encode a decimal integer, subtract the largest available place values or repeatedly divide by the new base and read the remainders in reverse.",
        "example": "Convert decimal 45 to binary and then compare bases.",
        "steps": [
          "45 = 32 + 8 + 4 + 1. Under weights 32, 16, 8, 4, 2, 1, write 101101₂.",
          "Six division-by-two remainders in order are 1, 0, 1, 1, 0, 1. Reading backwards gives 101101₂.",
          "In octal, 55₈ means 5 × 8 + 5 = 45. The digits depend on the base; the quantity stays the same."
        ]
      },
      {
        "title": "Hexadecimal notation",
        "text": "A hex digit represents a value from 0 to 15, using A through F for 10 through 15. Since 16 = 2⁴, each hex digit corresponds to four bits, including leading zeros in each group. Group a binary integer from the least significant end.",
        "example": "To convert 101101₂ to hex, pad the left to get 0010 1101. The groups are 2 and D, giving 0x2D. Convert back by writing four bits per digit."
      },
      {
        "title": "Long addition, multiplication and width",
        "text": "Add binary columns from the right. 1 + 1 gives sum bit 0 and carry 1; 1 + 1 + 1 gives sum bit 1 and carry 1. For unsigned long multiplication, each 1 bit in the multiplier contributes a shifted copy of the multiplicand. Add those partial products. A full product of two unsigned n-bit values may need 2n bits.",
        "example": "0101₂ × 0011₂ = 0101₂ + 1010₂ = 1111₂ (5 × 3 = 15). For addition, 1110₂ + 0011₂ = 1 0001₂. A four-bit destination retains 0001₂, and the leading 1 is a carry-out."
      },
      {
        "title": "Bitwise logic and masks",
        "text": "Bitwise AND gives 1 where both inputs have 1. OR gives 1 where either has 1. NOT inverts each bit within the specified width. Apply the truth table independently in each column. A mask is a pattern chosen to keep, clear or set selected bits.",
        "example": "For four-bit inputs 1011 and 0110, AND gives 0010, OR gives 1111, and NOT 1011 gives 0100. Masking a byte with 00001111 keeps the bottom four bits."
      },
      {
        "title": "Unsigned, sign-and-magnitude and two’s complement",
        "text": "Fixed width limits the representable values. A language’s type specifies how bits are to be interpreted. Sign-and-magnitude uses one sign bit and the remaining bits for magnitude, with two encodings of zero. In n-bit two’s complement, the high column has weight −2ⁿ⁻¹. The range is −2ⁿ⁻¹ to 2ⁿ⁻¹ − 1, with one zero.",
        "example": "For 1101₂, the unsigned value is 13. In four-bit sign-and-magnitude it is −5. In four-bit two’s complement it is −8 + 4 + 1 = −3. Always state both width and representation."
      },
      {
        "title": "Read, write, negate and extend",
        "text": "To decode a negative n-bit pattern, read it as unsigned then subtract 2ⁿ. To encode −x, subtract x from 2ⁿ, or encode +x, invert all n bits and add one. Inverting gives (2ⁿ − 1) − x, so the extra one gives 2ⁿ − x. Sign extension repeats the sign bit when widening a two’s complement value. Zero extension preserves an unsigned value.",
        "example": "Encode −19 in eight bits.",
        "steps": [
          "Write +19 as 00010011. Invert to 11101100 and add 1 to get 11101101.",
          "Read it back: unsigned 237 − 256 = −19. At 16 bits, sign-extend to 11111111 11101101.",
          "The most negative eight-bit value is −128. Its mathematical negation, +128, is outside the signed range; negating at the same width leaves 10000000."
        ]
      },
      {
        "title": "The same adder and two different overflow tests",
        "text": "Fixed-width addition keeps the low n bits: it works modulo 2ⁿ. Signed and unsigned interpretations of a high-bit-set pattern differ by 2ⁿ, so both use the same low-bit sum. Compute a − b by adding the two’s complement negation of b. For unsigned addition, carry-out signals overflow. Signed addition overflows when two operands of the same sign give a result of the opposite sign.",
        "example": "Four-bit 0111 + 0001 gives 1000. As unsigned, 7 + 1 = 8 fits. As signed, +8 exceeds the maximum of +7; 1000 decodes as −8. Conversely, 1111 + 0001 gives 1 0000: signed −1 + 1 = 0 fits despite the carry-out."
      },
      {
        "title": "Byte order in memory",
        "text": "Endianness specifies which byte of a multi-byte value goes at the lowest address. Big endian stores the most significant byte there; little endian stores the least significant byte there. Retain the order of bits inside each byte. A single byte has no byte-order ambiguity.",
        "example": "Store 0x12A0BC34 from address 100. In ascending address order, big endian gives 12 A0 BC 34. Little endian gives 34 BC A0 12. A common error is to reverse every individual hex digit, which changes the bytes themselves."
      }
    ],
    "checks": [
      [
        "A byte contains 10110110. Give its hex, unsigned and two’s complement values. What happens when it is widened to 16 signed bits?",
        "Grouping into 1011 0110 gives 0xB6. The unsigned value is 128 + 32 + 16 + 4 + 2 = 182. The signed value is 182 − 256 = −74. Widening repeats the sign bit: 11111111 10110110."
      ],
      [
        "A 16-bit word stores −2 in two’s complement. Give its little-endian bytes in order of increasing address. If you add +3, does signed overflow occur?",
        "The pattern for −2 is 0xFFFE. The low byte FE is stored first, followed by FF. Adding 0x0003 retains 0x0001. Signed −2 + 3 = +1 fits, so there is no signed overflow; the carry beyond bit 15 belongs to the unsigned calculation."
      ]
    ],
    "checklist": [
      "Count patterns and give signed and unsigned ranges at a stated width.",
      "Convert between decimal, binary and hex, preserving grouped zeros.",
      "Show carries, shifted partial products and width-limited results.",
      "Apply a Boolean operator independently in each column.",
      "Encode, decode and sign-extend negative values; distinguish carry from signed overflow.",
      "Arrange the bytes of a word in increasing memory-address order."
    ],
    "reading": [
      "ECS404-2_2026 slides, PDF pp. 4–30: bits and bases; pp. 34–60: arithmetic and bitwise logic; pp. 64–112: integer formats and two’s complement; pp. 114–130: byte order.",
      "Week 2 course notes, printed pp. 107–120: unsigned integers and bases; pp. 121–130: signed integers and negation."
    ]
  },
  {
    "week": 3,
    "aim": "Trace how a statement changes memory and registers, then explain how transistor circuits perform the underlying logic and addition.",
    "sections": [
      {
        "title": "Read a bit pattern in context",
        "text": "In an n-bit word, unsigned place values are all positive. Two’s complement gives the leftmost bit weight −2ⁿ⁻¹. Keeping the low n bits of an addition gives arithmetic modulo 2ⁿ, so one binary adder works for either interpretation. Hex writes each group of four bits as one digit.",
        "example": "What does the byte 0xE9 mean, and what happens if you add 30?",
        "steps": [
          "Expand E9 to 1110 1001. As unsigned it is 14 × 16 + 9 = 233. As signed it is 233 − 256 = −23.",
          "233 + 30 = 263. Keep the low byte: 263 − 256 = 7, or 0000 0111. This agrees with −23 + 30.",
          "The unsigned addition carried out. The signed sum fitted, so signed overflow did not occur. For signed addition, check whether equal-sign operands produced the opposite sign."
        ]
      },
      {
        "title": "Trace statements before tracing hardware",
        "text": "Program state includes the next statement and the current values of variables. An assignment reads the right-hand side before replacing its destination. A while loop tests before its first iteration and after each pass. Uninitialised local C variables have no value you can safely assume.",
        "example": "Trace x = 3, i = 2; while i > 0, double x and subtract 1 from i.",
        "steps": [
          "Start at (x,i) = (3,2). The first test succeeds. The first pass ends at (6,1).",
          "The second pass ends at (12,0). The next test fails, so 12 is the result. Starting with i = 0 would leave x at 3."
        ]
      },
      {
        "title": "Separate stack frames, heap objects and references",
        "text": "Each live function call has its own frame for call-related state. In the lecture model this includes parameters and local variables. The newest frame is released first. Dynamically allocated objects can outlive the call that created them. A reference gives access to an object. Several references can reach the same object.",
        "example": "A Java method creates an object, then returns its reference. The caller assigns that reference to both p and q.",
        "steps": [
          "The method returns and its frame is released. The caller can still reach the heap object.",
          "After p = null, q still reaches that same object. A garbage collector can reclaim it once no live path reaches it. Returning from a call alone does not establish that."
        ]
      },
      {
        "title": "Follow compilation, execution and register changes",
        "text": "An instruction set architecture (ISA) defines software-visible registers and instructions. A C compiler can produce target assembly, an assembler encodes instructions, and a linker combines program parts. Java typically compiles to JVM bytecode, which its runtime executes. In a CPU core, the front end fetches and decodes, the register file supplies operands, execution units do the work and loads/stores access memory. A chip can contain several cores, shared caches and memory interfaces.",
        "example": "Suppose address $fp + 8 holds 6. Trace lw $t0,8($fp), then sll $t0,$t0,1, then sw $t0,8($fp).",
        "steps": [
          "lw reads the word into $t0. The register now holds 6. The address is $fp + 8; 8 is a byte offset.",
          "sll shifts 6 left one bit, giving 12. Memory still holds 6 until sw writes 12 back.",
          "To implement a loop, a branch such as blez can exit on the opposite of i > 0. A label identifies an instruction location."
        ]
      },
      {
        "title": "Encode a MIPS immediate instruction",
        "text": "In a 32-bit I-format instruction the field widths are 6, 5, 5 and 16 bits. In order they hold the opcode, source register rs, register rt and immediate. The assembly operand order depends on the mnemonic. For addiu the written destination is rt. Its signed immediate is sign-extended and addition does not trap on signed overflow.",
        "example": "Encode addiu $5,$3,-2, with opcode 9.",
        "steps": [
          "Write 9 as 001001, source register 3 as 00011, and destination register 5 as 00101.",
          "Represent −2 in sixteen bits as 1111111111111110. Concatenate the fields to get 0x2465FFFE. Swapping the two register fields changes this instruction."
        ]
      },
      {
        "title": "Use MOSFETs as controlled switches",
        "text": "A transistor has a gate controlling the path between source and drain. In the ideal logic model an nMOS switch conducts at gate input 1 and a pMOS switch conducts at 0. A closed switch conducts. The oxide insulates the gate, whose electric field controls a channel. Background: doping silicon supplies mobile electrons in n-type material or holes in p-type material. A p–n junction conducts much more readily under forward bias.",
        "example": "Trace a CMOS inverter with pMOS between the supply and the output, and nMOS between the output and ground.",
        "steps": [
          "Input 0 turns on the pMOS and turns off the nMOS. The output has a path to the high rail and becomes 1.",
          "Input 1 selects the path to ground, giving 0. The word gate can mean the transistor’s control terminal or an entire logic circuit."
        ]
      },
      {
        "title": "Build a gate from its truth table",
        "text": "Series switches require every switch on the path to conduct. Parallel paths require at least one conducting path. Trace a complete path to High or Low for every input row. For a well-defined steady output, exactly one rail must be connected. In the course’s ideal switch construction an output-1 row gives one series path to High. Put those paths in parallel. Swapping device types and series/parallel connections produces the complementary condition for Low.",
        "example": "Design the High paths for XOR and check the row A = 1, B = 0.",
        "steps": [
          "XOR is 1 on rows 01 and 10. Row 01 needs pMOS(A) in series with nMOS(B). Row 10 needs nMOS(A) in series with pMOS(B).",
          "Connect those paths in parallel. For 10 both devices in the second path conduct. For 00 and 11 neither High path conducts. The Low network must conduct on precisely those equal-input rows.",
          "Compare OR and XOR on row 11. OR gives 1, XOR gives 0. In practical complementary CMOS, a NAND uses series nMOS to ground and parallel pMOS to supply."
        ]
      },
      {
        "title": "Explain the carry one column at a time",
        "text": "A half adder has two inputs. XOR produces the sum bit and AND produces the carry. A full adder accepts a carry-in as a third input. One half adder adds A and B, another adds the low bit to carry-in, and OR combines the two carries. An n-bit ripple adder passes each carry to the next column, which makes long carry chains slower to settle.",
        "example": "Add 0111 and 0001 with four result bits.",
        "steps": [
          "At bit 0, 1 + 1 gives sum 0 and carry 1. At bits 1 and 2, 1 + 0 + 1 repeats that result.",
          "At bit 3, 0 + 0 + 1 gives sum 1 and carry 0. The result is 1000. Unsigned, 7 + 1 = 8. Signed, +8 is outside −8…7.",
          "Check one column with A + B + carry-in = sum + 2 × carry-out. An adder can also subtract B by adding its bitwise complement and setting the first carry-in to 1."
        ]
      },
      {
        "title": "Explain how feedback holds one bit",
        "text": "A combinational circuit settles to an output fixed by its present inputs. In a sequential circuit, earlier inputs can affect the present output. The course notes cross-connect two NAND gates. With controls A,B, the outputs are C = NAND(A,D) and D = NAND(B,C). D is the stored bit in this diagram.",
        "example": "Trace controls (A,B) = 10, then 11, then 01, then 11.",
        "steps": [
          "At 10, B = 0 forces D = 1. A = 1 and D = 1 force C = 0. At 11 the complementary pair sustains itself, so reading D gives 1.",
          "At 01, A = 0 forces C = 1 and D becomes 0. The final 11 holds this new state. Starting at 11 without a previous write leaves the bit unspecified.",
          "00 forces both outputs to 1. Releasing both controls together need not produce a predictable bit. A DRAM cell uses another storage method: it senses and refreshes charge on a capacitor."
        ]
      }
    ],
    "checks": [
      [
        "Two aliases refer to one heap object. One variable goes out of scope. Can the collector immediately reclaim the object?",
        "Only if no live path to the object remains. A surviving alias that is still reachable keeps the object reachable."
      ],
      [
        "Under the ideal switch model, two parallel pMOS transistors controlled by A and B connect an output to High. For which inputs is that connection broken?",
        "Only 11. A low gate turns its pMOS on, and either conducting branch is enough to reach High. A complementary series nMOS pull-down makes this a NAND gate."
      ],
      [
        "A full adder receives 1, 1 and a carry-in of 1. Give sum and carry-out, and explain why.",
        "The first half adder gives low 0 and carry 1. Adding the carry-in to 0 gives low 1 and carry 0. OR the two carries to get carry-out 1. The pair carry-out,sum is 11₂ = 3."
      ],
      [
        "Why can two different values be read with identical hold inputs on a latch?",
        "Feedback supports two stable complementary states. The hold inputs preserve whichever state the previous write established."
      ]
    ],
    "checklist": [
      "Trace a loop, a nested call and the lifetime of a reachable object.",
      "Decode a load/shift/store sequence and allocate the fields of a 32-bit instruction.",
      "Translate between switch networks and truth tables, checking both supply rails.",
      "Build a full adder and distinguish unsigned carry from signed overflow.",
      "Trace a latch through write, hold and read."
    ],
    "reading": [
      "ECS404-3-2026.pdf, PDF pp. 2–14 (number recap), 22–76 (execution, calls and heap), 77–107 (compilation, MIPS and CPU blocks).",
      "ECS404-3-2026.pdf, PDF pp. 108–135 (semiconductor background), 136–178 (switches and gates), 179–196 (adders).",
      "ECS404-coursenotes-wk3.pdf, PDF pp. 9–17 (network design and arithmetic), 18–22 (latches and DRAM)."
    ]
  },
  {
    "week": 4,
    "aim": "Explain how each memory technology stores a bit, why memory is arranged in levels and how to calculate the time a processor waits.",
    "sections": [
      {
        "title": "Place data in the memory hierarchy",
        "text": "From the CPU outwards, consider registers, caches, main memory and persistent storage. A register holds a current operand, a cache keeps nearby copies for likely reuse, RAM holds active programs and data, and storage retains files after power is removed. Fast technologies usually cost more per bit. A hierarchy lets a small expensive level serve frequent requests while a larger level supplies capacity.",
        "example": "A 2.5 GHz processor needs data from a device with 64 ns access latency. Express that wait in clock cycles.",
        "steps": [
          "A cycle lasts 1/(2.5 × 10⁹) s = 0.4 ns. Divide the latency by the cycle time: 64/0.4 = 160 cycles.",
          "This converts elapsed time into cycles. Whether the CPU stalls for all 160 depends on caching and other work it can perform."
        ]
      },
      {
        "title": "Trace a six-transistor SRAM cell",
        "text": "Two inverters feed each other. Their internal nodes A and B have opposite values and encode one bit. Four transistors make the two inverters. Two access transistors connect the nodes to complementary bit lines when the word line is high. With access disabled, feedback continues holding the state while power is present.",
        "example": "In the lecture diagram B is the stored bit, linked to Bit+. Change a stored 1 to 0.",
        "steps": [
          "Initially B = 1 and A = 0. The inverter controlled by A drives B high. The inverter controlled by B drives A low.",
          "Drive Bit+ low and Bit− high. Raise the word line so W1 connects Bit+ to B and W2 connects Bit− to A. The drivers overcome the old feedback state.",
          "As B falls, the opposite inverter pulls A high, reinforcing B = 0. Lower the word line. A later read enables access and senses the complementary lines.",
          "Word-line low isolates the cell from its bit lines. Cutting the power would lose the bit. Static RAM needs power but no periodic refresh."
        ]
      },
      {
        "title": "Trace a one-transistor DRAM cell",
        "text": "The access transistor connects a capacitor to a bit line when its word line selects the row. A write charges or discharges the capacitor. Reading shares its small charge with the bit line. A sense amplifier detects the resulting small voltage difference and restores the cell. Leakage also makes periodic refresh necessary even when nobody reads it.",
        "example": "Explain why the controller has work to do both after a read and during a long idle period.",
        "steps": [
          "Immediately after a read, the charge has been disturbed. Restore the sensed state.",
          "During idle time charge slowly leaks. Periodically sense and restore rows before their states become ambiguous.",
          "One transistor and a capacitor take less area per bit than a typical SRAM cell. This makes dense main memory practical, at the cost of access and refresh work."
        ]
      },
      {
        "title": "Explain how flash retains charge",
        "text": "In the lecture’s floating-gate flash cell, insulation traps charge on a floating gate. The stored charge changes the threshold needed for the transistor to conduct. A read applies a chosen voltage and senses conduction. Programming or erasing uses stronger electric fields to change the stored charge.",
        "example": "Why can a USB stick remember its contents when unplugged but eventually wear out?",
        "steps": [
          "The insulation keeps charge trapped without a continuing supply. There is no DRAM-style refresh.",
          "Repeated program/erase cycles place stress on the insulating layers. NAND flash is erased in blocks; a controller can distribute erasures across blocks through wear levelling."
        ]
      },
      {
        "title": "Read a memory address and the bytes at it",
        "text": "Supporting course notes. In byte-addressed memory, n address bits name 2ⁿ byte locations. A 32-bit word occupies four bytes, and an aligned word starts at a multiple of four. Endianness determines which byte of a multi-byte value appears at the lowest address. Effective address = base + byte offset.",
        "example": "An array of 32-bit words starts at 0x180. Where is element 3, and how is 0x1122AABB stored there in little-endian order?",
        "steps": [
          "Element 3 starts 3 × 4 = 12 bytes from the base: 0x180 + 0x0C = 0x18C. Its four bytes occupy 0x18C through 0x18F.",
          "At increasing addresses the bytes are BB, AA, 22, 11. Big-endian order would be 11, 22, AA, BB. Endianness rearranges bytes within the word."
        ]
      },
      {
        "title": "Separate disk latency and bandwidth",
        "text": "Later slides. A magnetic disk head seeks to a track, waits for the required sector to rotate into place and then transfers the bytes. Latency measures the wait for a response. Bandwidth measures data transferred per unit time once transfer proceeds. Many short random reads can spend most of their time positioning the head.",
        "example": "A 6,000 rpm disk has a 5 ms average seek. Estimate the average positioning time, assuming uniformly placed sectors.",
        "steps": [
          "6,000/60 = 100 revolutions per second. One revolution takes 10 ms, so the average rotational wait is 5 ms.",
          "Add the average seek: 5 + 5 = 10 ms before transfer. Add transfer time separately as bytes divided by bytes per second."
        ]
      },
      {
        "title": "Use locality to reason about caches",
        "text": "Later slides. On a hit the cache already has the requested data. On a miss a whole line is brought from the next level and an old line may be evicted. Temporal locality is reuse of the same location. Spatial locality is access to nearby locations. A write-back cache must preserve modified data when evicting it. Tags identify which source block a line holds.",
        "example": "Suppose every lookup costs 2 ns. One in twenty lookups misses and adds 80 ns. Estimate mean access time.",
        "steps": [
          "Use hit time + miss rate × extra miss penalty. Every request pays 2 ns. The average extra delay is (1/20) × 80 = 4 ns, giving 6 ns overall.",
          "If 80 ns instead described the entire time for a miss, use 0.95 × 2 + 0.05 × 80. Decide from the wording which cost you have.",
          "A sequential array walk often benefits from bringing adjacent elements together. Repeated loop instructions also benefit from temporal reuse."
        ]
      },
      {
        "title": "Explain the virtual address space",
        "text": "Later slides. Virtual memory gives each process its own view of memory. The system maps virtual pages onto physical frames. The same virtual address in two processes can reach different RAM. Pages can occupy separate frames while looking contiguous to the program. A page fault requires the operating system to intervene; a non-resident page may need to be loaded from storage.",
        "example": "A process repeatedly needs four distinct pages, but only three frames are available to it.",
        "steps": [
          "The pages can belong to a virtual address space larger than those three frames. The missing page must be made resident when needed.",
          "If active pages repeatedly displace one another, frequent slow transfers can dominate execution. Virtual address space size alone tells you little about the speed of the workload."
        ]
      },
      {
        "title": "Connect memory and input/output",
        "text": "Supplement in the supplied course notes. An interrupt asks the processor to handle an event. Enough execution state must be preserved to resume the interrupted work. Direct memory access (DMA) allows a device controller to move data between the device and RAM after the CPU sets up the transfer.",
        "example": "A block read finishes while a program is calculating.",
        "steps": [
          "The DMA controller can place the bytes into RAM without the CPU copying each one. A completion interrupt can notify the OS.",
          "The handler handles the event and the system can resume the interrupted work using saved state. A context save does not require copying the entire program’s memory."
        ]
      }
    ],
    "checks": [
      [
        "What changes when an SRAM word line falls after a successful write?",
        "The access transistors turn off, disconnecting the bit lines. The powered cross-coupled inverters continue reinforcing the new complementary state."
      ],
      [
        "Which cell uses periodic refresh, which uses powered feedback, and which senses a persistent threshold change?",
        "DRAM refreshes capacitor charge, SRAM uses powered feedback, and the lecture’s flash transistor retains charge that changes its threshold."
      ],
      [
        "A 1.25 GHz processor waits 80 ns. How many cycle periods pass?",
        "One period is 0.8 ns. The wait spans 80/0.8 = 100 cycles."
      ],
      [
        "A small loop scans adjacent array elements five times. Identify both forms of locality.",
        "Touching neighbouring elements gives spatial locality. Reusing the loop instructions gives temporal locality, as can revisiting array elements on later passes if they are still in cache."
      ],
      [
        "Why can two processes both use virtual address 0x2000 without overwriting one another’s private data?",
        "Each process has its own mapping. Their virtual pages containing 0x2000 can refer to distinct physical frames."
      ]
    ],
    "checklist": [
      "Rank the levels and explain the trade-off in speed, capacity and cost per bit.",
      "Trace SRAM hold, read and write using the word line and complementary nodes.",
      "Explain why DRAM reads require restoration and why idle cells require refresh.",
      "Describe floating-gate retention, reading and endurance.",
      "Convert access time into CPU cycles, distinguish mechanical delay from transfer time, and apply the cache mean-time formula.",
      "Distinguish virtual addresses, physical frames and persistent storage."
    ],
    "reading": [
      "ECS404-4_2026.pdf, PDF pp. 9–25 (hierarchy), 26–60 (SRAM), 61–75 (DRAM), 76–87 (flash).",
      "ECS404-4_2026.pdf, PDF pp. 88–101 (disk), 102–129 (cache and locality), 130–150 (virtual memory). These later slides extend the recorded teaching.",
      "ECS404-coursenotes-wk4.pdf, PDF pp. 1–12 (storage), 13–15 (I/O supplement)."
    ]
  },
  {
    "week": 5,
    "aim": "Read the same bytes as text or as a number by choosing an encoding. Explain exactly where a floating-point calculation can lose a digit.",
    "sections": [
      {
        "title": "Why keep a cache?",
        "text": "A cache holds a small working set of recently used blocks from a slower store. A hit supplies the requested data immediately. A miss fetches its block from the slower level. Temporal locality means a recently used item is likely to be used again; spatial locality means its neighbours are likely to be used soon. Fetching a whole block can therefore pay for later reads.",
        "example": "Assume an empty cache, 16-byte blocks and no eviction. Read addresses 30, 31 and 32.",
        "steps": [
          "Address 30 belongs to block 16–31. Its first read misses and fetches that block.",
          "Address 31 hits in the same block. Address 32 starts block 32–47, so the third read misses."
        ]
      },
      {
        "title": "Virtual memory in the opening recap",
        "text": "A process gets a virtual address space for its code, heap and stack. Page tables map used virtual pages to fixed-sized RAM frames, which can sit anywhere in RAM. Unused addresses need not have a physical frame. Under pressure the OS can move inactive data to backing storage. Faulting it back in is slower than accessing RAM. Pages pinned for I/O stay resident; compressed memory saves RAM by compressing contents. See Week 6 for a full address translation."
      },
      {
        "title": "Hexadecimal groups four bits per digit",
        "text": "Base 16 uses 0–9 and A–F. A hex digit describes four binary places because 2⁴ = 16. For an integer, group bits from the right and pad the left edge with zeros. Keep interior zero groups: each stands for a place.",
        "example": "Convert 101101001₂ to hex and check the magnitude.",
        "steps": [
          "Pad and group: 0001 0110 1001.",
          "The groups are 1, 6 and 9, so the result is 0x169.",
          "Check: 1×256 + 6×16 + 9 = 361."
        ]
      },
      {
        "title": "Plain text, ASCII and Latin-1",
        "text": "A plain text file stores an encoded character sequence. ASCII assigns 128 values using seven bits, usually placed in bytes with bit 7 clear. Digits, letters, spaces and control codes all have values. Latin-1 uses one byte per code, keeps ASCII values 0–127 and adds characters such as £ (A3 hex). Different eight-bit code pages may give the same byte a different meaning.",
        "example": "Read ASCII bytes 35 09 41 0D 0A in a dump.",
        "steps": [
          "35 hex is decimal 53, the printed digit 5. Numeric value 5 would be 05.",
          "09 is tab and 41 is A. 0D is carriage return and 0A is line feed. Together CR LF form one common line ending; Unix text commonly uses LF alone.",
          "A dump shows the bytes, including invisible controls. An ordinary text file needs no final EOF byte."
        ]
      },
      {
        "title": "A Unicode code point and its bytes",
        "text": "Unicode gives abstract characters numbers written U+ followed by hexadecimal digits. Its code space runs from U+0000 to U+10FFFF. Encodings translate scalar values into code units. UTF-8 uses one to four 8-bit units, UTF-16 one or two 16-bit units, and UTF-32 one 32-bit unit. U+D800–U+DFFF are reserved for surrogate code units and cannot stand alone as Unicode scalar values. A displayed symbol can contain several code points.",
        "example": "U+00A3 identifies £. Latin-1 stores A3; UTF-8 stores C2 A3. The code point stays the same while the chosen representation changes."
      },
      {
        "title": "Encoding and decoding UTF-8",
        "text": "Read the prefix to determine length. U+0000–007F uses 0xxxxxxx. U+0080–07FF uses 110xxxxx 10xxxxxx. The three-byte form starts 1110xxxx; the four-byte form starts 11110xxx. Each remaining byte starts 10 and supplies six payload bits. Choose the shortest valid length. Reject missing continuations, overlong forms, surrogate values and code points above U+10FFFF.",
        "example": "Find the UTF-8 bytes for U+20AC (€), then read them back.",
        "steps": [
          "20AC in binary is 0010 0000 1010 1100. It needs three bytes, whose payload widths are 4, 6 and 6.",
          "Split as 0010 | 000010 | 101100. Add the prefixes to get 11100010 10000010 10101100, or E2 82 AC.",
          "For decoding, remove the prefix from each byte and join the payload groups. Their hex spelling returns 20AC."
        ]
      },
      {
        "title": "Byte order applies within a code unit",
        "text": "Big endian places the most significant byte at the lowest address. Little endian places the least significant byte there. In UTF-16 or UTF-32, arrange each code unit separately. UTF-8 code units are individual bytes, so the byte sequence has one defined order.",
        "example": "For U+20AC, the single UTF-16 unit is 20AC. Its bytes are 20 AC in big endian and AC 20 in little endian. The UTF-8 encoding E2 82 AC stays in that order on both machines."
      },
      {
        "title": "Binary fractions and scientific notation",
        "text": "After a binary point, successive places have weights 1/2, 1/4, 1/8 and so on. A normalised non-zero binary number is a sign times 1.f times a power of two. Moving the point left by one place requires increasing the exponent by one to preserve the value. Multiplication combines significands and adds exponents, then normalises again if needed.",
        "example": "Normalise 13.25 and use it to see why 0.1 is more difficult.",
        "steps": [
          "13 = 1101₂ and 0.25 = 0.01₂. Combine them to get 1101.01₂.",
          "Moving the point left three places gives 1.10101₂ × 2³. Checking 1 + 1/2 + 1/8 + 1/32, then multiplying by 8, gives 13.25.",
          "An exact finite binary fraction reduces to an integer over a power of two. One tenth has a factor of five in its denominator, so its binary expansion repeats."
        ]
      },
      {
        "title": "Precision, spacing and rounding",
        "text": "Range depends mainly on the exponent; precision depends on the number of significant bits. With p significant bits, the spacing in the normal interval [2ᵉ, 2ᵉ⁺¹) is 2^(e−p+1). Rounding chooses a representable neighbour. Round-to-nearest, ties-to-even chooses the neighbour with an even final retained digit when equally close. Directed modes towards zero, +∞ and −∞ can choose different values.",
        "example": "Why can adding 1 do nothing in binary32?",
        "steps": [
          "Binary32 has p = 24. At 2²⁴ the next larger normal value is two units away.",
          "2²⁴ + 1 lies halfway between 16,777,216 and 16,777,218. Ties-to-even selects 16,777,216.",
          "If that rounded sum is stored before subtracting 2²⁴, the answer is 0. Changing the grouping of an expression can change which intermediate result rounds."
        ]
      },
      {
        "title": "When arithmetic loses information",
        "text": "Subtracting close approximations can expose the error already in the inputs. For example, the difference of two measurements rounded to hundredths can be smaller than their combined uncertainty. Writing extra zeroes on the answer cannot recover the missing digits. A rounded reciprocal can likewise make x × (1/x) differ from 1. When comparing results calculated independently, choose any tolerance in light of the scale and accuracy needed."
      },
      {
        "title": "Read or write an IEEE 754 value",
        "text": "Binary32 stores 1 sign bit, 8 exponent bits and 23 fraction bits. Binary64 uses 1, 11 and 52. A normal value represents (−1)^sign × (1 + fraction) × 2^(stored exponent − bias). The bias is 127 or 1023. The hidden leading one gives 24 or 53 significant bits. Test for an all-zero or all-one exponent before using this formula. Week 6 explains those cases.",
        "example": "Encode −6.25 in binary32 and write it in memory order.",
        "steps": [
          "6.25 = 110.01₂ = 1.1001₂ × 2². The sign bit is 1.",
          "Store exponent 2 + 127 = 129 = 10000001₂. Store 1001 and nineteen zeros in the fraction field.",
          "The word in significance order is C0C80000. At increasing addresses its bytes are C0 C8 00 00 (big endian) or 00 00 C8 C0 (little endian). Reorder bytes before decoding the fields."
        ]
      }
    ],
    "checks": [
      [
        "Why does a UTF-8 file holding A£ plus a final LF take four bytes?",
        "A uses 41, £ uses C2 A3 and LF uses 0A. That is one plus two plus one bytes."
      ],
      [
        "Decode the UTF-8 bytes C2 B5.",
        "Remove 110 and 10. The remaining groups are 00010 and 110101. Joined and padded to hex, they give 00B5, so the code point is U+00B5 (µ)."
      ],
      [
        "Decode binary32 bytes 00 00 20 40 supplied in little-endian address order.",
        "The word is 40200000. Its sign is 0, stored exponent 128 gives actual exponent 1, and fraction .01₂ is 1/4. The result is 1.25 × 2 = 2.5."
      ],
      [
        "Round exact decimal 4.625 to three significant figures, ties to even. Why does the last digit matter?",
        "The neighbours are 4.62 and 4.63. They are equally close, so retain the even last digit 2 and choose 4.62."
      ]
    ],
    "checklist": [
      "Distinguish cache misses, page faults and the storage levels involved.",
      "Convert binary to hexadecimal without losing place values.",
      "Decode a byte dump using the stated encoding and byte order.",
      "Build and check UTF-8 payload groups.",
      "Normalise a binary fraction and reconstruct IEEE fields.",
      "Explain a numerical discrepancy using spacing, rounding or cancellation."
    ],
    "reading": [
      "Week 5 slide deck (ECS404-5_2026), PDF pp. 2–15 (cache and virtual memory recap), 22–30 (hexadecimal), 31–59 (ASCII and Latin-1), 60–110 (Unicode and UTF-8), 111–148 (floating-point behaviour), 149–163 (IEEE 754).",
      "Week 5 course notes, printed pp. 131–137 (floating point) and 138–144 (text)."
    ]
  },
  {
    "week": 6,
    "aim": "Translate an address and classify a floating-point pattern. Use the additional communications material to follow an I/O request from a device to a running process.",
    "sections": [
      {
        "title": "What a virtual machine provides",
        "text": "A hypervisor presents virtual CPUs, memory and devices to a guest operating system. The host supplies the underlying resources. Each guest can run its own OS and libraries, so incompatible services can share a server. Isolation, portability and consolidation help deployment, while guests still compete for physical CPU time and RAM. A container packages an application and its dependencies while sharing the host kernel. A language virtual machine such as the JVM instead defines an execution environment for program bytecode."
      },
      {
        "title": "A process and its address space",
        "text": "A process is a running instance of a program with its own execution state. Two processes can each use the same virtual address for different physical data. Code, heap and stack occupy regions of a process’s address space. Segmentation treats logical regions as variable-sized units. Paging uses equal-sized virtual pages and physical frames. A process can grow into scattered frames without needing a new contiguous physical allocation."
      },
      {
        "title": "Translate a page and offset",
        "text": "The memory management unit uses a page-table mapping and access permissions. Divide the virtual byte address by the page size: the quotient is the virtual page number and the remainder is the offset. Replace the page number with its mapped frame and keep the offset.",
        "example": "Pages are 1 KiB. Virtual address 0x0D34 lies on a page mapped to frame 5. Find the physical byte address.",
        "steps": [
          "1 KiB is 1024 bytes = 0x400. 0x0D34 = 3 × 0x400 + 0x134, so the virtual page is 3.",
          "Frame 5 begins at 5 × 0x400 = 0x1400. Preserve offset 0x134 to select the same byte within the frame.",
          "Physical address = 0x1534. Its low ten bits match the virtual offset because the page size is 2¹⁰."
        ]
      },
      {
        "title": "What happens on a page fault?",
        "text": "A page-table entry can show that a valid page is absent from RAM. The fault transfers control to the OS. Depending on the mapping, it can allocate a zero-filled page or load one from a file or swap. If it evicts a modified page it may need to write it back. After updating the mapping, the OS can resume the instruction. An invalid address or a permission violation calls for different handling. Repeated faults on actively used pages can make a process spend most of its time waiting for storage."
      },
      {
        "title": "Classify IEEE 754 before doing arithmetic",
        "text": "For binary32, stored exponent E from 1 to 254 means a normal finite value with actual exponent E − 127. E = 0 and a zero fraction gives signed zero. E = 0 and a non-zero fraction uses a leading zero and scale 2⁻¹²⁶: these are subnormal values. E = 255 and a zero fraction means signed infinity; a non-zero fraction means NaN. The analogous binary64 thresholds are 0 and 2047, with bias 1023.",
        "example": "Compare binary32 words 00800000, 00000001 and 7F800001.",
        "steps": [
          "00800000 has E = 1 and fraction 0. Its value is 1 × 2⁻¹²⁶, the smallest positive normal.",
          "00000001 has E = 0 and a fraction worth 2⁻²³. Multiply by 2⁻¹²⁶ to get 2⁻¹⁴⁹, the smallest positive subnormal.",
          "7F800001 has an all-ones exponent and a non-zero fraction. Classify it as NaN. Using the normal formula here would give a fictitious finite answer."
        ]
      },
      {
        "title": "Encode and verify a normal value",
        "text": "The exponent in memory is biased and unsigned. For a normal binary32 value, move the binary point to leave a single leading one, store the sign, add 127 to the exponent and keep only the trailing fraction. If the fraction does not fit, round according to the specified rule. Binary64 uses the same method with 52 trailing bits and bias 1023.",
        "example": "Encode +0.15625 in binary32.",
        "steps": [
          "0.15625 = 1/8 + 1/32 = 0.00101₂. Moving the point right three places gives 1.01₂ × 2⁻³.",
          "Sign = 0. Stored exponent = −3 + 127 = 124 = 01111100₂. Fraction = 01 followed by 21 zeros.",
          "The word is 3E200000. Check: (1 + 1/4) × 2⁻³ = 0.15625."
        ]
      },
      {
        "title": "Time slices and interrupts · additional slide material",
        "text": "A timer or I/O device can interrupt normal instruction flow. The processor enters a handler with enough state saved to return safely. For a timer interrupt, the scheduler may save the rest of the outgoing process’s context, choose another runnable process and restore its registers and program counter. Its code and ordinary memory data usually stay in place. One core can interleave processes; different cores can execute instructions simultaneously.",
        "example": "A keyboard input is slow relative to a CPU instruction. The processor can do other work while waiting. When input is ready, the controller signals an event and the handler arranges for software to receive it. Priorities help distinguish urgent device requests."
      },
      {
        "title": "Bus transactions, latency and bandwidth · additional slide material",
        "text": "A shared bus carries addresses, data and control signals. For a read, the requester identifies a destination and issues a read command; the addressed component provides data. A synchronous link uses an agreed clock. Asynchronous parties coordinate availability, often with handshakes or buffers. Latency is the delay for a request or response to begin; bandwidth is the quantity transferable per unit time. A high-rate link can still have a long initial delay. Shared CPU–memory bandwidth can limit throughput even when the processor is fast.",
        "example": "How long to receive 2,000 bytes on a link with 10 µs initial latency and 100 Mbit/s payload bandwidth? Assume no overlap or extra overhead.",
        "steps": [
          "2,000 bytes × 8 = 16,000 bits. At 100,000,000 bits/s, transfer time is 0.00016 s = 160 µs.",
          "Add the initial 10 µs once: 170 µs. Check the units; treating bytes as bits gives a result eight times too small for the transfer portion."
        ]
      },
      {
        "title": "USB polling and packets · additional slide material",
        "text": "In the USB 2.0 example, the host controls the bus. Hubs form a physical tree but transactions connect a host to an addressed device endpoint. A host token identifies the endpoint and direction. A data transfer and handshake may follow. USB interrupt transfers receive scheduled polling opportunities: the peripheral waits for the host transaction. The host controller can then notify the CPU through an internal interrupt. A cable carries power and data; USB 1.x/2.0 uses a differential data pair. In the illustrated full-speed NRZI signalling, a transition represents 0 and an unchanged state represents 1.",
        "example": "If the previous line state was J, the data bits 0, 1, 0 produce K, K, J. This example traces only data-bit transitions, excluding synchronisation, bit stuffing and packet delimiters."
      },
      {
        "title": "Exponential growth and computer generations · historical extension",
        "text": "The final part of the longer slide deck uses Moore’s law to discuss the rise in economically practical component counts on integrated circuits. A constant doubling interval gives exponential growth. More transistors can support cache, more cores or larger circuits; the speed of one program does not follow a fixed doubling rule. The historical examples move from valve machines, transistors and integrated circuits to single-chip CPUs, personal computers, portable devices and clusters. Mainframes time-shared jobs, while clusters and multicore processors can exploit parallel work. The Week 6 lecture slides cover this history on PDF pages 149–202.",
        "example": "At one doubling every two years, ten years contains five doublings. A count starting at N reaches 2⁵N = 32N under that assumption."
      }
    ],
    "checks": [
      [
        "Two processes both read virtual address 0x1200. Must the bytes match?",
        "No. The OS can give the processes different page tables, so their virtual pages can map to different frames. They match only if their mappings or stored contents make them match."
      ],
      [
        "Pages are 256 bytes. Page 2 maps to frame 9. Translate virtual 0x02A7.",
        "The virtual page is 2 and the offset is A7. Frame 9 starts at 0900 hex. The physical address is 09A7 hex."
      ],
      [
        "Interpret binary32 sign 1, exponent 11111111, fraction all zeros. What changes if the fraction ends in 1?",
        "The first pattern is negative infinity. Changing any fraction bit to 1 with an all-ones exponent yields NaN."
      ],
      [
        "Why can a USB keyboard offer an interrupt transfer even though the USB host polls?",
        "USB interrupt transfer names a scheduled endpoint service on the external bus. The host controller initiates it. Notification to the CPU is a separate event inside the host."
      ],
      [
        "A 4,000-byte block crosses a 1 Gbit/s payload link after a 5 µs initial delay. Find total time ignoring overhead.",
        "32,000 bits / 1,000,000,000 bits/s = 32 µs of transfer. Adding 5 µs gives 37 µs."
      ]
    ],
    "checklist": [
      "Distinguish a VM, a container, a process and a virtual address space.",
      "Translate a byte address with a named page size and explain a non-resident page fault.",
      "Classify normal, subnormal, signed zero, infinity and NaN from their fields.",
      "Encode and check one normal binary32 value and state the binary64 field widths.",
      "For the longer slide deck, explain a context switch, bus timing, USB polling and a doubling calculation."
    ],
    "reading": [
      "Week 6 longer slide deck (ECS404-6-2024-actual), PDF pp. 4–40 (floating point), 43–58 (virtualisation) and 59–86 (virtual memory). Additional sections: pp. 87–106 (interrupts and I/O), 107–133 (buses), 134–147 (USB) and 149–202 (Moore’s law and history).",
      "IEEE 754 companion slides (ECS404-6-2025-IEEE754), PDF pp. 9–18 (field layout, special exponents and byte order). Week 6 course notes, printed pp. 57–64 (communications) and pp. 76–80 (I/O)."
    ]
  },
  {
    "week": 8,
    "aim": "Follow an instruction from source code to a change in registers, memory or the program counter. Then work backwards from a 32-bit machine word to the assembly operation.",
    "sections": [
      {
        "title": "What an instruction set promises",
        "text": "An instruction set architecture (ISA) specifies the registers and instructions software can use, how an instruction is encoded and what executing it does. Microarchitecture is the hardware organisation that implements those rules. Two processors can execute the same MIPS binary using different pipelines or caches. MIPS has regular, fixed-width instruction forms and uses loads and stores for data memory. x86 offers more varied forms, including arithmetic with a memory operand. The names RISC and CISC describe these design traditions. Execution time also depends on instruction count, cycles per instruction and clock speed.",
        "example": "Why teach the same program in C and MIPS?",
        "steps": [
          "C expresses the calculation in terms of variables. A compiler chooses registers and target instructions to perform it.",
          "The processor executes an encoding. An assembly mnemonic such as add is a readable spelling of the operation."
        ]
      },
      {
        "title": "How a source file becomes a running program",
        "text": "A compiler translates higher-level operations. An assembler encodes real instructions, expands pseudoinstructions and records labels. The linker combines object files and libraries and resolves external names. The loader maps the executable into memory, prepares its starting state and transfers control to it. A source line can become several instructions.",
        "example": "Compare the routes used by familiar tools.",
        "steps": [
          "For a native C program, compiled functions from separate files can be linked into one executable.",
          "For Java, javac produces JVM bytecode. A suitable JVM can interpret it or compile parts of it to the host instruction set.",
          "A REPL reads, evaluates and prints each input. A notebook sends cells to its kernel. These describe ways to drive execution; each kernel still needs a language implementation."
        ]
      },
      {
        "title": "Reading a simulator one instruction at a time",
        "text": "MIPS32 has 32 general-purpose registers, each 32 bits wide. $zero ($0) always reads as zero, $a0–$a3 pass arguments, $v0–$v1 carry results, $t registers hold temporaries and $s registers hold values preserved by a callee. $sp marks the stack boundary, $fp can mark the frame base and $ra holds a return address. The PC selects an instruction; HI and LO hold results of certain multiply/divide instructions. Floating-point operations have their own register file.",
        "example": "Suppose PC = 0x00400020, $t0 = 8 and $t1 = 3. Step addu $t0,$t0,$t1.",
        "steps": [
          "Fetch the 32-bit instruction at the PC. Read the old operands 8 and 3 before changing the destination.",
          "$t0 becomes 11. $t1 remains 3 and data memory is unchanged.",
          "This sequential instruction occupies four bytes, so the next PC is 0x00400024. In QtSPIM or MARS, compare these predictions with the register and memory panes."
        ]
      },
      {
        "title": "Arithmetic, constants and comparisons",
        "text": "Register arithmetic normally writes its first assembly operand. An immediate is a constant stored in the instruction. addi and addiu sign-extend their 16-bit immediate. add/addu and sub/subu calculate the same low 32 result bits when allowed to complete; add and sub trap on signed overflow, while addu and subu retain the low word. slt writes 1 or 0 for a signed less-than test; sltu compares the same bits as unsigned.",
        "example": "Trace addiu $t0,$t0,-5 starting with $t0 = 3.",
        "steps": [
          "The immediate field is 0xFFFB. Extending its sign gives 0xFFFFFFFB, which represents −5.",
          "3 + (−5) gives −2, stored as 0xFFFFFFFE. A u suffix on addiu controls overflow trapping; its immediate can still be negative.",
          "A signed comparison of that result with zero gives “less than”. An unsigned comparison sees 4,294,967,294 and gives the opposite result."
        ]
      },
      {
        "title": "Masks, shifts and Boolean tests",
        "text": "and, or and nor combine corresponding bit positions. andi and ori zero-extend the immediate mask. A logical shift fills the newly exposed positions with zeroes. sll by two scales an index by four when no significant bits are lost; srl by two gives unsigned integer division by four. slt produces one Boolean value about two complete operands. A branch can test that value.",
        "example": "Suppose $t0 = 0x000000AB.",
        "steps": [
          "andi $t1,$t0,0x000F keeps the low four bits, giving 0x0000000B.",
          "sll $t2,$t1,2 moves 1011 two places to give 101100, or 44.",
          "nor $t3,$t0,$zero flips all 32 bits, giving 0xFFFFFF54. Flipping all bits of the Boolean 1 would give 0xFFFFFFFE; it would not implement Boolean negation."
        ]
      },
      {
        "title": "Moving a variable between memory and the CPU",
        "text": "Each address identifies one byte. A halfword uses two bytes and a word uses four. An ordinary lw or sw needs a word-aligned address. Effective address equals the value in the base register plus a signed offset in bytes. A load copies memory into a register; a store copies a register back to memory. lbu and lhu zero-extend shorter unsigned values.",
        "example": "A variable at 12($s0) contains 18. $s0 = 0x10010000. Increase the stored variable by three.",
        "steps": [
          "lw $t0,12($s0) reads the word at 0x1001000C into $t0. Memory still contains 18.",
          "addiu $t0,$t0,3 gives 21 in the register.",
          "sw $t0,12($s0) changes the four bytes belonging to that variable. $s0 still holds the base address."
        ]
      },
      {
        "title": "Turning an if statement or a loop into branches",
        "text": "beq and bne compare registers and branch on equality or inequality. For an if/else, branch past the first block when its condition fails, then jump around the other block when the first one succeeds. For a loop, initialise, test, execute the body and update the index. slt tests a strict inequality; the branch following it decides which instructions execute. The pseudoinstruction blt can expand into slt followed by bne.",
        "example": "A loop starts out = 3 and applies out = out + a[i] − i while i < len. Let a = [4, −1] and len = 2.",
        "steps": [
          "At i = 0 the test is true. A word array uses address base + 4i, so the first load reads 4. The new out is 7.",
          "At i = 1 load from base + 4. The new out is 7 + (−1) − 1 = 5.",
          "At i = 2 the test is false, so return 5 without reading a third word. With len = 0 the initial test fails and the result is 3."
        ]
      },
      {
        "title": "Organising a small assembly program",
        "text": "The .text directive selects instructions and .data selects static data. A label names the current address; .word reserves and initialises 32-bit words, and .asciiz writes character bytes followed by a zero terminator. A comment begins with #. Static data and instructions have distinct regions; dynamic allocations commonly use the heap, and call frames use the stack. A label may name a location without itself occupying any bytes.",
        "example": "Predict what you can see after stepping a program.",
        "steps": [
          "If x is declared as .word 50, la $t0,x gives the address of x. lw $t1,0($t0) reads 50 from that address.",
          "li $v0,10 followed by syscall requests exit under the SPIM service convention. li and la are pseudoinstructions; syscall is a real instruction.",
          "If a string precedes a .word, check alignment before calculating the word address. In the simulator, inspect the assembled addresses as well as the source labels."
        ]
      },
      {
        "title": "Selecting R, I or J format",
        "text": "Each real instruction in this model occupies 32 bits. R format splits into opcode, rs, rt, rd, shift amount and function, with widths 6, 5, 5, 5, 5 and 6. I format uses opcode, rs, rt and a 16-bit field. J format uses a six-bit opcode and a 26-bit target index. Five bits identify one of 32 registers. The field contains its register number; data in that register can change without changing the instruction.",
        "example": "Encode addi $t1,$t0,-3.",
        "steps": [
          "The Green Sheet gives addi opcode 8. The source is register 8 ($t0) and the destination is register 9 ($t1). In I format rs comes before rt.",
          "The fields are 001000 | 01000 | 01001 | 1111111111111101. The last field is −3 represented in 16-bit two’s complement.",
          "Regroup all 32 bits into nibbles to get 0x2109FFFD. To decode, read the opcode first, then split using its format. For R-format add/sub, the function field distinguishes the operations."
        ]
      },
      {
        "title": "Branch offsets and jump targets",
        "text": "A branch carries a signed 16-bit word displacement from the instruction following the branch. With branch address P and stored displacement d, target = P + 4 + 4d. In J format, j/jal take the top four bits of P + 4, append the 26-bit index, then append two zero bits for alignment. jr instead takes its target directly from a register. The J-format address calculation is supporting Green Sheet detail for the short Week 8 introduction.",
        "example": "A bne at 0x00400030 must branch back to 0x00400020.",
        "steps": [
          "The reference point P + 4 is 0x00400034. Subtracting gives a displacement of −20 bytes.",
          "Divide by four to encode −5 words as 0xFFFB. A taken branch reaches the target even though the encoded field is not a byte address.",
          "In the classic delayed model the instruction at P + 4 executes before control reaches the target. Use the simulator or question’s stated convention."
        ]
      }
    ],
    "checks": [
      [
        "What changes when sw $t1,8($s0) executes with $s0 = 0x2000 and $t1 = 61?",
        "The word at 0x2008 receives 61. Neither register changes. Ordinary execution continues at the next instruction."
      ],
      [
        "How can you implement a branch for x ≥ y using slt?",
        "slt $t0,x,y produces 1 when x < y. beq $t0,$zero,label branches on the complementary case, x ≥ y. Here x and y stand for registers."
      ],
      [
        "Why is a register selector five bits wide, even when the value is 32 bits?",
        "Five bits encode 32 possible register numbers. The instruction selects an existing register, whose separate storage holds all 32 data bits."
      ],
      [
        "A taken branch is at 0x00400100 and has displacement −2. Where does it go?",
        "Start at 0x00400104, then add −8 bytes. The target is 0x004000FC."
      ],
      [
        "Decode 0x21090004, then trace it for $t0 = 6.",
        "Opcode 8 means addi. rs = 8, rt = 9, immediate = 4. addi $t1,$t0,4 places 10 in $t1 and leaves $t0 unchanged."
      ]
    ],
    "checklist": [
      "Trace PC, destination registers and affected memory separately.",
      "Translate a conditional and a bounded word-array loop, including a zero-length input.",
      "Encode a signed immediate and explain how operand order maps to fields.",
      "Use the Green Sheet to decode a real instruction and identify pseudoinstructions."
    ],
    "reading": [
      "Week 8 slides, PDF pp. 8–54 for the ISA, compilation, simulator and registers; pp. 55–74 for ALU operations and memory.",
      "Week 8 slides, PDF pp. 75–98 for branches, loops and source layout; pp. 99–107 for machine formats.",
      "MIPS Green Sheet, PDF p. 1, gives instruction fields and conventions."
    ]
  },
  {
    "week": 9,
    "aim": "Use addresses to explain what a memory access actually reads or writes. Follow a call far enough to say where its arguments, return address, local variables and result live.",
    "sections": [
      {
        "title": "Bytes, virtual addresses and the memory map",
        "text": "A 32-bit virtual address can name 2³² individual bytes, or 4 GiB of address space. Virtual memory gives each process its own address space, with valid pages mapped to physical storage and access permissions. A word occupies four consecutive bytes; aligned word starts have their low two address bits clear. In the teaching layout, text holds instructions, static data holds long-lived program data, the heap grows upward for allocations and the stack grows downward for calls. Some ranges are reserved for the operating system.",
        "example": "A region runs from 0x2000 through 0x202F, both endpoints included.",
        "steps": [
          "Its size is last − first + 1 = 0x30 = 48 bytes.",
          "The region holds 12 aligned words. The last starts at 0x202C and includes the final byte 0x202F.",
          "A process need not have physical RAM backing every possible virtual address. A virtual range by itself does not tell you its RAM usage."
        ]
      },
      {
        "title": "Load addresses, byte values and strings",
        "text": "la obtains a label’s address. lw follows an address to read a word, whereas lbu reads one byte and clears the other 24 bits. sb stores the low eight bits of its source register at one byte address. SPIM service 4 prints the NUL-terminated string addressed by $a0 when invoked by syscall with $v0 = 4. Service 10 exits. Newline (0x0A) and the zero terminator (0x00) have different jobs.",
        "example": "A buffer at 0x10010020 contains the ASCII string “CAT” followed by NUL. Change it to “BAT”.",
        "steps": [
          "The initial bytes at offsets 0, 1, 2, 3 are 0x43, 0x41, 0x54, 0x00. At the base address, lbu reads the ASCII code for C.",
          "Subtract one to obtain 0x42, then sb to offset zero. A calculation in a register alone would leave the string unchanged.",
          "Printing from 0x10010020 now reads B, A, T in increasing address order and stops at offset 3. A word-sized store could overwrite all four bytes."
        ]
      },
      {
        "title": "Reading a dump and building a full address",
        "text": "Endianness tells you how to assign significance to bytes within a multibyte quantity. In a little-endian dump, the lowest address supplies the low byte of a displayed word. Read a string by increasing byte address. To create a full 32-bit address, lui can place a 16-bit constant in the high half, then ori can insert the zero-extended low half. The assembler may use several instructions behind la.",
        "example": "Two ways to read the simulator display.",
        "steps": [
          "With bytes 42 41 54 00 at increasing addresses, a little-endian word display shows 0x00544142. Reading the characters still gives BAT followed by NUL.",
          "lui $t0,0x1001 gives 0x10010000. ori $t0,$t0,0x0020 gives 0x10010020. The register now holds an address. No byte of the string has been read."
        ]
      },
      {
        "title": "Identify what is being addressed",
        "text": "An immediate is a constant in the instruction. A register operand uses the contents of a named register. A base/displacement load uses a register plus a signed byte offset to locate data. PC-relative branches use a signed word displacement. Pseudodirect jumps combine a 26-bit index with the upper bits of the following PC. One instruction can use several modes, such as a branch that compares register operands and locates its destination PC-relatively.",
        "example": "Compare lw $t0,4($s0), addiu $t0,$s0,4 and bne $t0,$zero,label.",
        "steps": [
          "If $s0 = 0x3000, lw looks inside address 0x3004. addiu simply computes the number 0x3004.",
          "The branch tests two register values. If they differ, its target is PC + 4 + 4 × signed displacement. A register-indirect jr uses the address already held in its register."
        ]
      },
      {
        "title": "What a call must preserve",
        "text": "The caller supplies the first four integer arguments in $a0–$a3; $v0 carries the first result. Caller-saved temporaries may change during a call. A callee that changes a saved register must restore it. jal saves a return address in $ra and transfers to the function. jr $ra returns to the saved address. The lecture uses classic delay slots, so jal at P sets $ra to P + 8. A simulator configured for nondelayed calls can use a different link convention.",
        "example": "Assume jal square is at 0x00400040 and is followed by nop.",
        "steps": [
          "The link is 0x00400048; the instruction at 0x00400044 occupies the delay slot.",
          "The callee runs with that link in $ra. Its result goes in $v0, so it can return a number as well as transfer control.",
          "A leaf function makes no nested call and can normally reuse its incoming $ra. A non-leaf function must preserve its own return route before another jal replaces it."
        ]
      },
      {
        "title": "Why a stack frame has two useful pointers",
        "text": "A frame reserves storage for one active invocation. A prologue can lower $sp, save the previous $fp and give $fp a stable starting address for local slots. An epilogue restores saved registers and raises $sp to its entry value. As different invocations have different frame bases, identical offsets can refer to different variables. A simple leaf function can often omit this machinery when optimised.",
        "example": "A square function enters with $sp = 0x2000 and $a0 = 6. It follows the lecture’s eight-byte frame convention.",
        "steps": [
          "Subtract 8 from $sp. The reserved range is 0x1FF8–0x1FFF. Store the caller’s $fp at 4($sp), address 0x1FFC. Set $fp to 0x1FF8.",
          "The argument home slot 8($fp) begins at 0x2000. It belongs to space provided by the caller, above the eight bytes just reserved. Spill 6 there if the compiled code requests it.",
          "Multiply 6 by 6 into $v0 to obtain 36. The displayed three-register mul writes its destination; mult is a different instruction using HI and LO.",
          "Reload the saved $fp, restore $sp to 0x2000 and return. Releasing a frame changes the allocation boundary; it need not erase the old bytes."
        ]
      },
      {
        "title": "A function that calls another function",
        "text": "A non-leaf function has two different return points to track. Saving its incoming $ra protects the route back to its caller. A new jal sets a temporary route back into the current function. A returned result in $v0 can also be overwritten by later instructions, so keep any result still needed in a safe register or local slot.",
        "example": "Trace discriminant(2,5,3), using the lecture’s square(b) call to calculate b² − 4ac.",
        "steps": [
          "On entry $a0, $a1 and $a2 contain 2, 5 and 3. Preserve the incoming $ra and live arguments. Move b into $a0 because square has one argument.",
          "jal square replaces $ra. square returns 25 in $v0 to the instruction sequence following the call. Save that value before reusing $v0.",
          "Compute a × c = 6. Shifting left two bits gives 24. Subtract this from 25 to get 1 in $v0.",
          "Restore the original $ra from the current frame, restore $fp and $sp, and return to the outer caller. Without restoring the link, jr would jump back inside discriminant."
        ]
      },
      {
        "title": "Objects, fields and the hidden this argument",
        "text": "One method body can operate on many objects because each call passes the address of the particular object. In the compiled Rectangle example, the constructor receives this in $a0, height in $a1 and width in $a2. Each instance holds its own two words; the method instructions live in the text segment. Source-level private fields are enforced by the language implementation; a basic MIPS load has no private-field flag.",
        "example": "A simple Rectangle begins at 0x2400, with height 5 and width 8.",
        "steps": [
          "The constructor stores 5 at 0($a0), address 0x2400, and 8 at 4($a0), address 0x2404. These offsets belong to this compiled layout.",
          "area receives the same object address. A word load from each offset gets the dimensions; multiplying them returns 40 in $v0.",
          "A saved copy of this at 8($fp) is a stack slot holding a pointer. Accessing the field requires following the pointer and applying the field offset."
        ]
      },
      {
        "title": "Pointers, arrays and object lifetime",
        "text": "In C and C++, &x produces the address of x, while *p accesses the object at the address stored in p. Array elements occupy consecutive storage. In many expressions an array converts to a pointer to its first element. A local C++ Rectangle can live in a stack frame; a dynamically allocated object has a separately managed lifetime. Java references allow access to objects without exposing raw addresses or C-style pointer arithmetic. A copied reference can refer to the same object as the original.",
        "example": "Which base should you use?",
        "steps": [
          "For word array A beginning at 0x2500, element 6 starts at 0x2500 + 6 × 4 = 0x2518. For a byte string, element 6 starts only six bytes after its base.",
          "For a local slot, start from the current frame base. For a field, start from the object’s address. Computing either address does not allocate an object.",
          "A local reference and the object it reaches may have different lifetimes. The eight-byte Rectangle drawing describes the lecture’s simple C++ layout; a Java runtime can have object headers and alignment padding."
        ]
      }
    ],
    "checks": [
      [
        "A little-endian word display shows 0x00474142. Which ASCII bytes occur from its base address, and what string would service 4 print?",
        "The bytes are 42, 41, 47, 00 in hex. They encode B, A, G, NUL, so it prints BAG when $a0 addresses that word."
      ],
      [
        "If jal at 0x00400060 is followed by a delay-slot nop, what does $ra hold in the lecture model?",
        "0x00400068. Execution performs the instruction at 0x00400064 before entering the callee."
      ],
      [
        "A routine starts with $sp = 8192, subtracts 24 and runs sw $ra,20($sp). Where is the return address stored?",
        "The new $sp is 8168. The saved word begins at 8168 + 20 = 8188 and occupies bytes 8188–8191."
      ],
      [
        "Why can a second jal break a non-leaf function even when its arithmetic is correct?",
        "It replaces $ra with the route back into the non-leaf function. Save the incoming link before the nested call and restore it before returning to the outer caller."
      ],
      [
        "A slot at 0x3010 contains the object address 0x5000. The field at offset 4 contains 12. What do the two successive loads return?",
        "The first obtains the pointer 0x5000 from 0x3010. The next reads from 0x5004 and returns 12. Using 0x3014 would address a neighbouring pointer slot instead."
      ]
    ],
    "checklist": [
      "Read a byte, aligned word or NUL-terminated string from a stated memory layout.",
      "Classify addressing modes and distinguish an effective address from the value it holds.",
      "Track $a0, $v0, $sp, $fp and $ra through a nested call and restoration.",
      "Describe a field access using the object base and the field’s byte offset."
    ],
    "reading": [
      "Week 9 slides, PDF pp. 9–17 and 18–40 for virtual addresses, memory layout and the string/dump example; pp. 41–50 for addressing modes.",
      "Week 9 slides, PDF pp. 51–69 for a leaf function and pp. 70–93 for nested calls; pp. 94–120 for objects, arrays and references.",
      "MIPS Green Sheet, PDF pp. 1–2, for instruction encodings, registers and ASCII."
    ]
  }
];
