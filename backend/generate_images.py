import asyncio
import os
import base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Load environment variables
load_dotenv()

api_key = os.getenv("EMERGENT_LLM_KEY")

# Service prompts for image generation
services = [
    {
        "name": "fachadas",
        "prompt": "Professional photo of workers painting the exterior facade of a modern residential building, scaffolding, blue sky, high quality, realistic, commercial photography style"
    },
    {
        "name": "interna",
        "prompt": "Professional photo of a painter in white uniform painting an interior wall with a roller, clean modern apartment hallway, bright lighting, commercial photography style"
    },
    {
        "name": "trincas",
        "prompt": "Close-up professional photo of a construction worker repairing and treating cracks in a concrete wall, using specialized tools, commercial photography style"
    },
    {
        "name": "impermeabilizacao",
        "prompt": "Professional photo of workers applying waterproofing membrane on a building rooftop terrace, sunny day, commercial construction photography style"
    },
    {
        "name": "textura",
        "prompt": "Professional photo of an artisan applying decorative textured finish grafiato on an exterior wall, showing the texture pattern, commercial photography style"
    },
    {
        "name": "consultoria",
        "prompt": "Professional photo of an engineer with hard hat and clipboard inspecting a building facade, taking notes, professional business photography style"
    }
]

async def generate_image(service):
    try:
        chat = LlmChat(
            api_key=api_key, 
            session_id=f"image-gen-{service['name']}", 
            system_message="You are an expert image generator"
        )
        chat.with_model("gemini", "gemini-3-pro-image-preview").with_params(modalities=["image", "text"])
        
        msg = UserMessage(text=service['prompt'])
        text, images = await chat.send_message_multimodal_response(msg)
        
        if images:
            img = images[0]
            image_bytes = base64.b64decode(img['data'])
            output_path = f"/app/frontend/public/images/{service['name']}.png"
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(image_bytes)
            print(f"✅ Generated: {service['name']}.png")
            return True
        else:
            print(f"❌ No image generated for {service['name']}")
            return False
    except Exception as e:
        print(f"❌ Error generating {service['name']}: {str(e)[:100]}")
        return False

async def main():
    print("🎨 Generating service images with Gemini Nano Banana...")
    print("-" * 50)
    
    for service in services:
        await generate_image(service)
        await asyncio.sleep(1)  # Small delay between requests
    
    print("-" * 50)
    print("✅ Image generation complete!")

if __name__ == "__main__":
    asyncio.run(main())
