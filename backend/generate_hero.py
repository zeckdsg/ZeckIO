import asyncio
import os
import base64
from emergentintegrations.llm.chat import LlmChat, UserMessage

api_key = os.environ.get("EMERGENT_LLM_KEY", "sk-emergent-70aAa305a1b9bC74a9")

async def generate_hero_image():
    try:
        chat = LlmChat(
            api_key=api_key, 
            session_id="hero-condominio", 
            system_message="You are an expert image generator"
        )
        chat.with_model("gemini", "gemini-3-pro-image-preview").with_params(modalities=["image", "text"])
        
        prompt = """Create a stunning high-quality photograph of a modern luxury residential condominium building complex. 
        The building should have a freshly painted facade in elegant white and light gray tones. 
        Beautiful blue sky with some clouds in the background. 
        Professional architectural photography style, wide angle shot, golden hour lighting.
        The building should look prestigious and well-maintained, showing balconies and modern design.
        No text or watermarks."""
        
        msg = UserMessage(text=prompt)
        text, images = await chat.send_message_multimodal_response(msg)
        
        if images:
            img = images[0]
            image_bytes = base64.b64decode(img['data'])
            output_path = "/app/frontend/public/images/hero-condominio.jpg"
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, "wb") as f:
                f.write(image_bytes)
            print("✅ Hero image generated successfully!")
            return True
        else:
            print("❌ No image generated")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)[:100]}")
        return False

if __name__ == "__main__":
    asyncio.run(generate_hero_image())
